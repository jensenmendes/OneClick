//importação
const bcrypt = require('bcrypt')
const { getUsers, createUser, getOneUser, updateUser, updateSenha, deleteUser, getRole, checkUsername, getSenha } = require('../dbModels/userModel')
const { generateRandomPassword, generateUsername } = require('../utils/registerUser')
const logger = require('../utils/logger')
    //const { password } = require('../config/db')
const jwt = require('jsonwebtoken')
const { password } = require('../config/db')
require('dotenv').config()


//Adicionar utilizador
addUser = async(req, res) => {

    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert user data
    const { pNome, uNome, email, funcao, telemovel } = req.body

    const estado = 'passivo'
    let username = ''
    const senha = generateRandomPassword()

    //verificar campos
    if (!pNome || !uNome || !email || !funcao || !telemovel) return res.status(422).json({ msg: 'Preencha os campos.' })

    //user is true if is exist
    let userExist = true


    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;

        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //check his role
        if (userFuncao !== 'Admin') return res.status(422).json({ msg: 'Sem permissão para criar novo utilizador' })

        //check if user exist
        while (userExist) {
            //generate username
            username = generateUsername(pNome, uNome)

            //check if username in db
            const checkUser = await checkUsername(username)

            if (!checkUser) userExist = false
        }

        //Hash password
        const saltRounds = parseInt(8);
        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(senha, salt)


        //add user
        const result = await createUser(pNome, uNome, email, username, hashPassword, funcao, telemovel, estado)

        //check user is insert in db
        if (!result) {
            logger.error('Erro ao adicionar novo utilizador!')
            return res.status(422).json({ msg: 'Erro ao adicionar novo utilizador!' })
        }

        //Sucesso na adição de novo utilizador
        logger.info('Utilizador adicionado com sucesso!')
        res.status(201).json({ msg: `Utilizador adicionado com sucesso! Username: ${username}, password: ${senha}` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}


//Listar todos utilizadores
listUsers = async(req, res) => {

    //get token
    const accessToken = req.cookies.token

    console.log('Token access: ', accessToken)

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;


        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Lista todos os utilizadores disponiveis no sistema

        const result = await getUsers(userFuncao)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao listar os utilizadores!')
            return res.status(422).json({ msg: 'Erro ao listar os utilizadores!' })
        }

        //IS OKAY
        return res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}


//Listar um utilizador
listOneUser = async(req, res) => {
    //Get id by params
    const { getId } = req.params

    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;

        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Lista o utilizador selecionado
        const result = await getOneUser(getId, userFuncao)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao listar o utilizador!')
            return res.status(422).json({ msg: 'Erro ao listar o utilizador!' })
        }

        //IS OKAY
        return res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }

}

//Atualizar utilizador
atualizarUser = async(req, res) => {
    const { getId } = req.params
    const { pNome, uNome, email, funcao, telemovel, estado } = req.body

    if (!pNome || !uNome || !email || !funcao || !telemovel || !estado) return res.status(422).json({ msg: 'Preencha os campos.' })

    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;

        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Atualizar o user
        const result = await updateUser(getId, pNome, uNome, email, funcao, telemovel, estado, userFuncao)

        //check if is okay
        if (!result) {
            logger.error('Erro ao atualizar o utilizador!')
            return res.status(422).json({ msg: 'Erro ao atualizar o utilizador!' })
        }

        //Okay
        logger.info('User atualizado com sucesso')
        return res.status(200).json({ msg: 'User atualizado com sucesso' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Atualizar Password
atualizarSenha = async(req, res) => {
    const { newSenha, confSenha, oldSenha } = req.body

    if (!newSenha || !confSenha || !oldSenha) return res.status(422).json({ msg: 'Preencha os campos.' })

    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;

        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Verificar a senha antiga is matched

        const getUserSenha = await getSenha(id)

        //Discroptografar senha
        const checkPass = await bcrypt.compare(oldSenha, getUserSenha)

        //verifica se pass match
        if (!checkPass) {
            logger.error('Senhas não batem.')
            return res.status(422).json('Senhas não batem')
        }

        //verificar tamanho da senha
        if (newSenha.length < 8) {
            logger.error('Senha não segue poltica de segurança.')
            return res.status(422).json('Senha não segue poltica de segurança')
        }

        //Confirmar senha
        if (newSenha !== confSenha) {
            logger.error('Senhas não confirmam.')
            return res.status(422).json('Senhas não confirmam')
        }

        //Hash password
        const saltRounds = parseInt(8);
        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(newSenha, salt)

        //Atualizar a senha
        const result = await updateSenha(id, hashPassword)

        //check if is okay
        if (!result) {
            logger.error('Erro ao atualizar a senha!')
            return res.status(422).json({ msg: 'Erro ao atualizar a senha!' })
        }

        //Okay
        logger.info('Senha atualizado com sucesso')
        return res.status(200).json({ msg: 'Senha atualizado com sucesso' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Eliminar utilizador
eliminarUser = async(req, res) => {
    //Get id by params
    const { getId } = req.params

    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;

        //get funcao user logged
        const userFuncao = await getRole(id)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Elimina o utilizador selecionado
        const result = await deleteUser(getId, userFuncao)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao eliminar o utilizador!')
            return res.status(422).json({ msg: 'Erro ao eliminar o utilizador!' })
        }

        //IS OKAY
        return res.status(200).json({ msg: 'Utilizador eliminado!' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    addUser,
    listUsers,
    listOneUser,
    atualizarSenha,
    atualizarUser,
    eliminarUser
}