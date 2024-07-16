//Importação
const { createFornecedor, getFornecedores, getOneFornecedor, updateFornecedor, deleteFornecedor, checkSupplier } = require('../dbModels/fornecedorModel')
const { getRole } = require('../dbModels/userModel')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

//Create Fornecedor
createSupplier = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert fornecedor data
    const { nomeEmpresa, zona, cidade, ilha, pais, email, telefone, telemovel } = req.body

    //verificar campos
    if (!nomeEmpresa || !zona || !cidade || !ilha || !pais || !email || !telefone || !telemovel) return res.status(422).json({ msg: 'Preencha os campos.' })


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
            logger.error('Não tem permissão para criar fornecedores!')
            return res.status(422).json({ msg: 'Não tem permissão para criar fornecedores!' })
        }

        //check if exist fornecedor
        const checkFornecedor = await checkSupplier(nomeEmpresa)

        if (checkFornecedor) {
            const getId = checkFornecedor
            const updFornecedor = await updateFornecedor(getId, nomeEmpresa, zona, cidade, ilha, pais, email, telefone, telemovel)
            if (!updFornecedor) {
                logger.error('Erro ao atualizar dados do fornecedor!')
                return res.status(422).json({ msg: 'Erro ao atualizar dados do fornecedor!' })
            }

            logger.info('Fornecedor atualizado com sucesso!')
            return res.status(201).json({ msg: `Fornecedor atualizado com sucesso!` })
        }

        //add fornecedor
        const result = await createFornecedor(nomeEmpresa, zona, cidade, ilha, pais, email, telefone, telemovel)

        //check fornecedor is insert in db
        if (!result) {
            logger.error('Erro ao adicionar novo fornecedor!')
            return res.status(422).json({ msg: 'Erro ao adicionar novo fornecedor!' })
        }

        //Sucesso na adição de novo Fornecedor
        logger.info('Fornecedor adicionado com sucesso!')
        res.status(201).json({ msg: `Fornecedor adicionado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Listar Fornecedores
listSuppliers = async(req, res) => {
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
            logger.error('Não tem permissão para listar fornecedores!')
            return res.status(422).json({ msg: 'Não tem permissão para listar fornecedores!' })
        }

        //get fornecedores
        const result = await getFornecedores()

        //check if is correctly
        if (!result) {
            logger.error('Erro ao listar fornecedores!')
            return res.status(422).json({ msg: 'Erro ao listar fornecedores!' })
        }

        //IS OKAY
        return res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Lista um Fornecedor
listOneSupplier = async(req, res) => {
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
            logger.error('Não tem permissão para listar fornecedores!')
            return res.status(422).json({ msg: 'Não tem permissão para listar fornecedores!' })
        }

        //get categoria
        const result = await getOneFornecedor(getId)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao listar fornecedor!')
            return res.status(422).json({ msg: 'Erro ao listar fornecedor!' })
        }

        //IS OKAY
        return res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Update Fornecedor
atualizarFornecedor = async(req, res) => {
    const { getId } = req.params
    const { nomeEmpresa, zona, cidade, ilha, pais, email, telefone, telemovel } = req.body

    if (!nomeEmpresa || !zona || !cidade || !ilha || !pais || !email || !telefone || !telemovel) return res.status(422).json({ msg: 'Preencha os campos.' })

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
            logger.error('Não tem permissão para atualizar fornecedores!')
            return res.status(422).json({ msg: 'Não tem permissão para atualizar fornecedores!' })
        }

        //Atualizar o fornecedor
        const result = await updateFornecedor(getId, nomeEmpresa, zona, cidade, ilha, pais, email, telefone, telemovel)

        //check if is okay
        if (!result) {
            logger.error('Erro ao atualizar o fornecedor!')
            return res.status(422).json({ msg: 'Erro ao atualizar o fornecedor!' })
        }

        //Okay
        logger.info('Fornecedor atualizado com sucesso')
        return res.status(200).json({ msg: 'Fornecedor atualizado com sucesso' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//DELETE FORNECEDOR
eliminaSupplier = async(req, res) => {
    //Get id by params
    const { getId } = req.params

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

        //Verificar se user tem permissao para eliminar
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para eliminar fornecedor!')
            return res.status(422).json({ msg: 'Não tem permissão para eliminar fornecedor!' })
        }

        //delete Fornecedor
        const result = await deleteFornecedor(getId)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao eliminar fornecedor!')
            return res.status(422).json({ msg: 'Erro ao eliminar fornecedor!' })
        }

        //IS OKAY
        logger.info('Fornecedor eliminado com sucesso!')
        return res.status(200).json({ msg: 'Fornecedor eliminado com sucesso!' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createSupplier,
    listSuppliers,
    listOneSupplier,
    atualizarFornecedor,
    eliminaSupplier
}