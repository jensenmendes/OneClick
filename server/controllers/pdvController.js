//Importação
const { createPDV, getOnePdv, getPDVs, deletePDV, checkPdv } = require('../dbModels/pdvModel')
const { gerarPDV } = require('../utils/createCaixa')
const { getRole } = require('../dbModels/userModel')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const { log } = require('winston')

//Add new PDV
addPdv = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    let isTrue = true

    //get PDV
    let pdv = ''
    const estado = 'Fechado'

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

        //Verificar se user tem permissao para criar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para criar um PDV!')
            return res.status(422).json({ msg: 'Não tem permissão para criar um PDV!' })
        }

        while (isTrue) {
            pdv = await gerarPDV()

            //check if exist pdv
            const existPDV = await checkPdv(pdv)

            if (!existPDV) {
                isTrue = false
            }

        }

        //add PDV
        const result = await createPDV(pdv, estado)

        //check PDV is insert in db
        if (!result) {
            logger.error('Erro ao adicionar novo pdv!')
            return res.status(422).json({ msg: 'Erro ao adicionar novo pdv!' })
        }

        //Sucesso na adição de novo pdv
        logger.info('PDV adicionado com sucesso!')
        res.status(201).json({ msg: `PDV adicionado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List PDV
listarPDV = async(req, res) => {
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

        //Verificar se user tem permissao para listar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para listar PDV!')
            return res.status(422).json({ msg: 'Não tem permissão para listar PDV!' })
        }

        //listar PDV
        const result = await getPDVs()

        //check PDV is insert in db
        if (!result) {
            logger.error('Erro ao listar pdv!')
            return res.status(422).json({ msg: 'Erro ao listar pdv!' })
        }

        //Sucesso

        res.status(201).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List One PDV
listarOnePDV = async(req, res) => {
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

        //Verificar se user tem permissao para listar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para listar PDV!')
            return res.status(422).json({ msg: 'Não tem permissão para listar PDV!' })
        }

        //listar PDV
        const result = await getOnePdv(getId)

        //check PDV 
        if (!result) {
            logger.error('Erro ao listar pdv!')
            return res.status(422).json({ msg: 'Erro ao listar pdv!' })
        }

        //Sucesso
        res.status(201).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Eliminar PDV
eliminarPDV = async(req, res) => {
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

        //Verificar se user tem permissao para eliminar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para eliminar PDV!')
            return res.status(422).json({ msg: 'Não tem permissão para eliminar PDV!' })
        }

        //eliminar PDV
        const result = await deletePDV(getId)

        //check PDV 
        if (!result) {
            logger.error('Erro ao eliminar pdv!')
            return res.status(422).json({ msg: 'Erro ao eliminar pdv!' })
        }

        //Sucesso
        logger.info('PDV eliminado com sucesso!')
        res.status(200).json({ msg: 'PDV eliminado com sucesso!' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    addPdv,
    listarPDV,
    listarOnePDV,
    eliminarPDV
}