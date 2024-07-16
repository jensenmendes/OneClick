//Importação
const { getClientes, getCliente, updateCliente, deleteCliente } = require('../dbModels/clienteModel')
const { getRole } = require('../dbModels/userModel')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

//Add Cliente

//List Clientes
listaClientes = async(req, res) => {
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
            logger.error('Não tem permissão para listar Clientes!')
            return res.status(422).json({ msg: 'Não tem permissão para listar Clientes!' })
        }


        //get clientes
        const result = await getClientes()

        //check clientes is okay
        if (!result) {
            logger.error('Erro ao listar clientes!')
            return res.status(422).json({ msg: 'Erro ao listar clientes!' })
        }

        //Sucesso 
        res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Lista Cliente
listaCliente = async(req, res) => {

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
            logger.error('Não tem permissão para listar Cliente!')
            return res.status(422).json({ msg: 'Não tem permissão para listar Cliente!' })
        }


        //get clientes
        const result = await getCliente(getId)

        //check cliente is okay
        if (!result) {
            logger.error('Erro ao listar cliente!')
            return res.status(422).json({ msg: 'Erro ao listar cliente!' })
        }

        //Sucesso 
        res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Atualizar Cliente
atualizarCliente = async(req, res) => {
    //Get id by params
    const { getId } = req.params

    //get datas
    const { nome, localidade, ilha, nif, email, telefone, telemovel, pontos } = req.body

    //verificar se não tem campos vazios
    if (!nome || !localidade || !ilha || !nif || !email || !telefone || !telemovel || !pontos) return res.status(422).json({ msg: 'Preencha os campos.' })

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

        //Verificar se user tem permissao para atualizar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para atualizar Cliente!')
            return res.status(422).json({ msg: 'Não tem permissão para atualizar Cliente!' })
        }


        //get clientes
        const result = await updateCliente(getId, nome, localidade, ilha, nif, email, telefone, telemovel, pontos)

        //check cliente is okay
        if (!result) {
            logger.error('Erro ao atualizar cliente!')
            return res.status(422).json({ msg: 'Erro ao atualizar cliente!' })
        }

        //Sucesso 
        logger.info('Cliente atualizado com sucesso!')
        res.status(200).json({ msg: `Cliente atualizado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Eliminar Cliente
eliminarCliente = async(req, res) => {
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
            logger.error('Não tem permissão para eliminar Cliente!')
            return res.status(422).json({ msg: 'Não tem permissão para eliminar Cliente!' })
        }


        //get clientes
        const result = await deleteCliente(getId)

        //check cliente is okay
        if (!result) {
            logger.error('Erro ao eliminar cliente!')
            return res.status(422).json({ msg: 'Erro ao eliminar cliente!' })
        }

        //Sucesso 
        logger.info('Cliente eliminado com sucesso!')
        res.status(200).json({ msg: `Cliente eliminado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    listaClientes,
    listaCliente,
    atualizarCliente,
    eliminarCliente
}