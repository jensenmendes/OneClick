//Importação
const { createDesconto, getDescontos, getDesconto, updateDesconto, deleteDesconto, checkDesconto } = require('../dbModels/descontoModel')
const { getRole } = require('../dbModels/userModel')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

//add desconto
addDesconto = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert desconto data
    const { descricao, dataInicio, dataFim, metodo, tipo, valor } = req.body

    let estado = ''

    //verificar campos
    if (!descricao || !dataInicio || !dataFim || !metodo || !tipo || !valor) return res.status(422).json({ msg: 'Preencha os campos.' })


    try {

        //verify token
        const decodedToken = jwt.verify(accessToken, process.env.SECRET);

        const id = decodedToken.id;

        //get funcao user logged
        const userFuncao = await getRole(id)

        console.log('User Função: ', userFuncao)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Verificar se user tem permissao para criar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para criar descontos!')
            return res.status(422).json({ msg: 'Não tem permissão para criar descontos!' })
        }

        //Obter data de hoje
        const today = new Date()

        //converter para data
        const dInicio = new Date(dataInicio)
        const dFim = new Date(dataFim)


        //check data
        if (dInicio < today || dFim < today || dFim < dInicio) {
            logger.error('Erro na seleção das datas!')
            return res.status(422).json({ msg: 'Erro na seleção das datas!' })
        }

        //check if exist desconto
        const existDesconto = await checkDesconto(descricao)

        if (existDesconto) {
            logger.error('Desconto já existe!')
            return res.status(422).json({ msg: `Desconto já existe!` })
        }

        //adicionar estado ao desconto
        if (dInicio == today && today <= dFim) {
            estado = 'Ativo'
        } else if (today < dInicio) {
            estado = 'Inativo'
        }

        //add desconto
        const result = await createDesconto(descricao, dInicio, dFim, metodo, tipo, valor, estado)

        //check desconto is insert in db
        if (!result) {
            logger.error('Erro ao adicionar novo desconto!')
            return res.status(422).json({ msg: 'Erro ao adicionar novo desconto!' })
        }

        //Sucesso na adição de novo desconto
        logger.info('Desconto adicionado com sucesso!')
        res.status(201).json({ msg: `Desconto adicionado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//list desconto
listaDescontos = async(req, res) => {
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
            logger.error('Não tem permissão para listar descontos!')
            return res.status(422).json({ msg: 'Não tem permissão para listar descontos!' })
        }


        //get desconto
        const result = await getDescontos()

        //check desconto is okay
        if (!result) {
            logger.error('Erro ao listar descontos!')
            return res.status(422).json({ msg: 'Erro ao listar descontos!' })
        }

        //Sucesso 
        res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

listaDesconto = async(req, res) => {
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
            logger.error('Não tem permissão para listar desconto!')
            return res.status(422).json({ msg: 'Não tem permissão para listar desconto!' })
        }



        //get desconto
        const result = await getDesconto(getId)

        //check desconto is okay
        if (!result) {
            logger.error('Erro ao listar desconto!')
            return res.status(422).json({ msg: 'Erro ao listar desconto!' })
        }

        //Sucesso 
        res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

atualizarDesconto = async(req, res) => {
    //Get id by params
    const { getId } = req.params

    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert desconto data
    const { descricao, dataInicio, dataFim, metodo, tipo, valor } = req.body

    //verificar campos
    if (!descricao || !dataInicio || !dataFim || !metodo || !tipo || !valor) return res.status(422).json({ msg: 'Preencha os campos.' })


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

        //Verificar se user tem permissao para atualizar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para atualizar desconto!')
            return res.status(422).json({ msg: 'Não tem permissão para atualizar desconto!' })
        }



        //atualizar desconto
        const result = await updateDesconto(getId, descricao, dataInicio, dataFim, metodo, tipo, valor)

        //check desconto is okay
        if (!result) {
            logger.error('Erro ao atualizar desconto!')
            return res.status(422).json({ msg: 'Erro ao atualizar desconto!' })
        }

        //Sucesso 
        logger.info('Desconto atualizado com sucesso!')
        res.status(200).json({ msg: `Desconto atualizado com sucesso!` })


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//delete desconto
eliminarDesconto = async(req, res) => {
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
            logger.error('Não tem permissão para eliminar desconto!')
            return res.status(422).json({ msg: 'Não tem permissão para eliminar desconto!' })
        }



        //eliminar desconto
        const result = await deleteDesconto(getId)

        //check is okay
        if (!result) {
            logger.error('Erro ao eliminar desconto!')
            return res.status(422).json({ msg: 'Erro ao eliminar desconto!' })
        }

        //Sucesso 
        logger.info('Desconto eliminado com sucesso!')
        res.status(200).json({ msg: `Desconto eliminado com sucesso!` })


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    addDesconto,
    listaDescontos,
    listaDesconto,
    atualizarDesconto,
    eliminarDesconto
}