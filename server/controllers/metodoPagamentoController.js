//Importação
const { createMeiosPago, getMeiosPago, getOneMeio, deleteMeioPagamento, checkMeioPago } = require('../dbModels/metodoPagamentoModel')
const { getRole } = require('../dbModels/userModel')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

//Add new Meio Pagamento
addMetodoPagamento = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert metodo 
    const { metodo } = req.body

    //verificar campos
    if (!metodo) return res.status(422).json({ msg: 'Preencha os campos.' })


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
        if (userFuncao !== 'Admin') {
            logger.error('Não tem permissão para criar metodo de pagamento!')
            return res.status(422).json({ msg: 'Não tem permissão para criar metodo de pagamento!' })
        }

        //check if exist metodo
        const existMetodo = await checkMeioPago(metodo)

        if (existMetodo) {
            logger.error('Metodo de pagamento já foi criada!')
            return res.status(201).json({ msg: `Metodo de pagamento já foi criada!` })
        }

        //add Metodo
        const result = await createMeiosPago(metodo)

        //check metodo is insert in db
        if (!result) {
            logger.error('Erro ao adicionar novo metodo!')
            return res.status(422).json({ msg: 'Erro ao adicionar novo metodo!' })
        }

        //Sucesso na adição de novo metodo
        logger.info('Metodo de pagamento adicionado com sucesso!')
        res.status(201).json({ msg: `Metodo de pagamento adicionado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

listMetodoPagamento = async(req, res) => {
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
        if (userFuncao !== 'Admin') {
            logger.error('Não tem permissão para listar metodo de pagamento!')
            return res.status(422).json({ msg: 'Não tem permissão para listar metodo de pagamento!' })
        }

        //list Metodos
        const result = await getMeiosPago()

        ////check if is correctly
        if (!result) {
            logger.error('Erro ao listar metodos de pagamento!')
            return res.status(422).json({ msg: 'Erro ao listar metodos de pagamento!' })
        }

        //Sucesso 
        res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List one metodo pagamento
listOneMetodoPagamento = async(req, res) => {
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
        if (userFuncao !== 'Admin') {
            logger.error('Não tem permissão para listar metodo de pagamento!')
            return res.status(422).json({ msg: 'Não tem permissão para listar metodo de pagamento!' })
        }

        //list Metodos
        const result = await getOneMeio(getId)

        ////check if is correctly
        if (!result) {
            logger.error('Erro ao listar metodo de pagamento!')
            return res.status(422).json({ msg: 'Erro ao listar metodo de pagamento!' })
        }

        //Sucesso 
        res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Eliminar metodo de pagamento
eliminarMetodoPagamento = async(req, res) => {
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
        if (userFuncao !== 'Admin') {
            logger.error('Não tem permissão para eliminar metodo de pagamento!')
            return res.status(422).json({ msg: 'Não tem permissão para eliminar metodo de pagamento!' })
        }

        //eliminar Metodo
        const result = await deleteMeioPagamento(getId)

        //check if is correctly
        if (!result) {
            logger.error('Erro ao eliminar metodo de pagamento!')
            return res.status(422).json({ msg: 'Erro ao eliminar metodo de pagamento!' })
        }

        //Sucesso 
        res.status(200).json({ msg: 'Metodo de Pagamento eliminado com sucesso!' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    addMetodoPagamento,
    listMetodoPagamento,
    listOneMetodoPagamento,
    eliminarMetodoPagamento
}