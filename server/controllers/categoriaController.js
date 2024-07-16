//Importação
const { createcategoria, getCategorias, getOneCategoria, deleteCategoria, checkCategoria } = require('../dbModels/categoriaModel')
const { getRole } = require('../dbModels/userModel')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

//Create Categoria
newCategoria = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert categoria 
    const { nomeCategoria } = req.body

    //verificar campos
    if (!nomeCategoria) return res.status(422).json({ msg: 'Preencha os campos.' })


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
            logger.error('Não tem permissão para criar categoria!')
            return res.status(422).json({ msg: 'Não tem permissão para criar categoria!' })
        }

        //check if exist categoria
        const existCategoria = await checkCategoria(nomeCategoria)

        if (existCategoria) {
            logger.error('Categoria já foi criada!')
            return res.status(201).json({ msg: `Categoria já foi criada!` })
        }

        //add Categoria
        const result = await createcategoria(nomeCategoria)

        //check categoria is insert in db
        if (!result) {
            logger.error('Erro ao adicionar nova categoria!')
            return res.status(422).json({ msg: 'Erro ao adicionar nova categoria!' })
        }

        //Sucesso na adição de nova categoria
        logger.info('Categoria adicionado com sucesso!')
        res.status(201).json({ msg: `Categoria adicionado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List Categorias
listasCategoria = async(req, res) => {
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
            logger.error('Não tem permissão para listar categorias!')
            return res.status(422).json({ msg: 'Não tem permissão para listar categorias!' })
        }

        //get categorias
        const result = await getCategorias()

        //check if is correctly
        if (!result) {
            logger.error('Erro ao listar categorias!')
            return res.status(422).json({ msg: 'Erro ao listar categorias!' })
        }

        //IS OKAY
        return res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List One Categoria
listaCategoria = async(req, res) => {
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
            logger.error('Não tem permissão para listar categorias!')
            return res.status(422).json({ msg: 'Não tem permissão para listar categorias!' })
        }

        //get categoria
        const result = await getOneCategoria(getId)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao listar categoria!')
            return res.status(422).json({ msg: 'Erro ao listar categoria!' })
        }

        //IS OKAY
        return res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Delete Categoria
eliminaCategoria = async(req, res) => {
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
            logger.error('Não tem permissão para eliminar categoria!')
            return res.status(422).json({ msg: 'Não tem permissão para eliminar categoria!' })
        }

        //get categoria
        const result = await deleteCategoria(getId)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao eliminar categoria!')
            return res.status(422).json({ msg: 'Erro ao eliminar categoria!' })
        }

        //IS OKAY
        logger.info('Categoria eliminado com sucesso!')
        return res.status(200).json({ msg: 'Categoria eliminado com sucesso!' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    newCategoria,
    listasCategoria,
    listaCategoria,
    eliminaCategoria
}