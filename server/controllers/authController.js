//dependencies
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//import
const { authUser, getIdLogged, getUserState, updateUserState, getRole } = require('../dbModels/userModel')
const { checkInternetStatus } = require('../utils/netConn')
const logger = require('../utils/logger')

//Login
userLogin = async(req, res) => {
    //GET DATAS
    const { username, password } = req.body

    //VERIFIED FILEDS
    if (!username || !password) {
        logger.error('Username ou Password está vazio')
        return res.status(422).json({ msg: 'Username ou Password está vazio' })
    }

    try {
        //CHECK USER and get user password
        const result = await authUser(username)

        //Check user state
        const state = await getUserState(username)

        if (state !== 'Ativo' && state !== 'passivo') {
            logger.error('Utilizador não pode efetuar login no momento!')
            return res.status(422).json({ msg: 'Utilizador não pode efetuar login no momento!' })
        }

        //Get id of user
        const idLogged = await getIdLogged(username)

        //IF USER DOENST EXIST
        if (!result) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Get user função
        const userFuncao = await getRole(idLogged)

        //Get internet status(online ou offline)
        const netStatus = await checkInternetStatus()

        console.log('Net Status: ', netStatus)

        //verificar se user tem permissão para logar online ou offline
        if ((userFuncao === 'Admin' || userFuncao === 'Gerente') && !netStatus) {
            logger.error('Sem conexão à internet!')
            return res.status(503).json('Sem conexão à internet!')
        }

        if (username === 'admin') {
            if (password !== result) {
                logger.error('Senha errado!')
                return res.status(422).json({ msg: 'Senha errado!' })
            }

            //GET TOKEN
            const secret = process.env.SECRET

            const accessToken = jwt.sign({
                id: idLogged
            }, secret)

            //Define cookie com token
            res.cookie('token', accessToken, { httOnly: true, secure: true })


            //Login efetuado com sucesso
            return res.status(200).json({ msg: `Login efetuado com sucesso! get Token: ${accessToken}` })
        }

        //check password
        const checkPass = await bcrypt.compare(password, result)

        if (!checkPass) {
            logger.error('Senha errado!')
            return res.status(422).json({ msg: 'Senha errado!' })
        }

        //GET TOKEN
        const secret = process.env.SECRET

        const accessToken = jwt.sign({
            id: idLogged
        }, secret)

        //Update user state passive to ative if necessary
        if (state === 'passivo') {
            const uptState = await updateUserState(username)

            if (!uptState) {
                logger.error('Estado de utilizador não foi alterado, verificar!')
            }
        }

        //Define cookie com token
        res.cookie('token', accessToken, { httOnly: true, secure: true })

        //Login efetuado com sucesso
        res.status(200).json({ msg: `Login efetuado com sucesso! get Token: ${accessToken}` })

    } catch (error) {

        logger.error(`Erro: ${error}`)
    }
}

//FORGOT PASSWORD

//TOKEN ACESSO

//RESET PASSWORD

module.exports = { userLogin }