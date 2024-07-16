//Importação
const { openFluxoCaixa, getFluxoCaixas, getFluxoCaixa, closeFluxoCaixa, deleteFluxoCaixa } = require('../dbModels/fluxoCaixaModel')
const { getRole, getUserAuthenticatedName } = require('../dbModels/userModel')
const { checkPdv, updatePdvState, getPdvState } = require('../dbModels/pdvModel')
const { UserLogado } = require('../models')
const { addUserLogado, getReferencia, getPdvOpen } = require('../dbModels/utilizadorLogadoModel')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

abrirFCaixa = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert data
    const { pdv, saldoInicial } = req.body

    //Obter hora de entrada de fluxo de caixa
    const entrada = new Date()

    //estado de fluxo de caixa
    const estado = 'Aberto'

    //verificar campos
    if (!pdv || !saldoInicial) return res.status(422).json({ msg: 'Preencha os campos.' })


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

        //Verificar se user tem permissao para abrir fluxo caixa
        if (userFuncao !== 'Vendedor') {
            logger.error('Não tem permissão para abrir fluxo caixa!')
            return res.status(422).json({ msg: 'Não tem permissão para abrir fluxo caixa!' })
        }

        //get pdv id
        const idCaixa = await checkPdv(pdv)

        console.log('idCaixa: ', idCaixa)

        if (!idCaixa) {
            logger.error('PDV não existe!')
            return res.status(422).json({ msg: `PDV não existe!` })
        }

        //verificar estado da caixa
        const checkPdvState = await getPdvState(pdv)

        console.log('checkPdvState: ', checkPdvState)

        if (checkPdvState === 'Aberto') {
            logger.error('PDV está em operação!')
            return res.status(422).json({ msg: `PDV está em operação!` })
        }

        //verificar se o user ja esta a operar em um pdv

        //atualizar estado da caixa
        const uptCaixa = await updatePdvState(pdv, estado)

        if (!uptCaixa) {
            logger.error('Erro ao abrir a caixa!')
            return res.status(422).json({ msg: `Erro ao abrir a caixa!` })
        }

        //get name of user logado
        const utilizador = await getUserAuthenticatedName(id)

        console.log('Id: ', id)
        console.log('Utilizador: ', utilizador)


        //open fluxo de caixa
        const result = await openFluxoCaixa(saldoInicial, entrada, id, idCaixa)

        //check fluxo is insert in db
        if (!result) {
            logger.error('Erro ao abrir fluxo de caixa!')
            return res.status(422).json({ msg: 'Erro ao abrir fluxo de caixa!' })
        }

        //Adicionar de info de user logado e com caixa para o db local
        const userLogado = await addUserLogado(utilizador, pdv, result, accessToken)

        if (!userLogado) {
            logger.error('Erro ao adionar utilizador referenciado na caixa!')
            return res.status(422).json({ msg: 'Erro ao adionar utilizador referenciado na caixa!' })
        }


        //Sucesso na abertura de fluxo de caixa
        logger.info('Fluxo de caixa aberto com sucesso!')
        res.status(201).json({ msg: `Fluxo de caixa aberto com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

fecharFCaixa = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

    //Insert data
    const { saldoFinal } = req.body

    //Obter hora de saida de fluxo de caixa
    const saida = new Date()

    //estado de fluxo de caixa
    const estado = 'Fechado'

    //verificar campos
    if (!saldoFinal) return res.status(422).json({ msg: 'Preencha os campos.' })

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

        //Verificar se user tem permissao para fechar fluxo caixa
        if (userFuncao !== 'Vendedor') {
            logger.error('Não tem permissão para fechar fluxo caixa!')
            return res.status(422).json({ msg: 'Não tem permissão para fechar fluxo caixa!' })
        }

        console.log('AAcess token: ', accessToken)

        //get pdv
        const pdv = await getPdvOpen(accessToken)

        //atualizar estado da caixa
        const uptCaixa = await updatePdvState(pdv, estado)

        if (!uptCaixa) {
            logger.error('Erro ao fechar a caixa!')
            return res.status(422).json({ msg: `Erro ao fechar a caixa!` })
        }

        //get referencia de fluxo de caixa
        const idFluxoCaixa = await getReferencia(accessToken)

        console.log('idFluxoCAIXA: ', idFluxoCaixa)

        //close fluxo de caixa
        const result = await closeFluxoCaixa(idFluxoCaixa, saldoFinal, saida)

        //check fluxo is insert in db
        if (!result) {
            logger.error('Erro ao fechar fluxo de caixa!')
            return res.status(422).json({ msg: 'Erro ao fechar fluxo de caixa!' })
        }

        //Sucesso na abertura de fluxo de caixa
        logger.info('Fluxo de caixa fechado com sucesso!')
        res.status(201).json({ msg: `Fluxo de caixa fechado com sucesso!` })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List historic of fluxo de caixa
listaFCaixas = async(req, res) => {
    //get token
    const accessToken = req.cookies.token

    if (!accessToken) return res.status(401).json('Token não encontrado')

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

        //Verificar se user tem permissao para listar fluxo caixa
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para listar fluxo caixas!')
            return res.status(422).json({ msg: 'Não tem permissão para listar fluxo caixas!' })
        }

        //get fluxo de caixas
        const result = await getFluxoCaixas()

        //check is succes
        if (!result) {
            logger.error('Erro ao listar fluxo de caixa!')
            return res.status(422).json({ msg: 'Erro ao listar fluxo de caixa!' })
        }

        //Sucesso na abertura de fluxo de caixa
        res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List one historic of fluxo de caixa
listaFCaixa = async(req, res) => {
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

        console.log('User Função: ', userFuncao)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Verificar se user tem permissao para listar fluxo caixa
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para listar fluxo caixas!')
            return res.status(422).json({ msg: 'Não tem permissão para listar fluxo caixas!' })
        }

        //get fluxo de caixas
        const result = await getFluxoCaixa(getId)

        //check is succes
        if (!result) {
            logger.error('Erro ao listar fluxo de caixa!')
            return res.status(422).json({ msg: 'Erro ao listar fluxo de caixa!' })
        }

        //Sucesso 
        res.status(200).json(result)

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}


//Eliminar of fluxo de caixa
eliminarFCaixa = async(req, res) => {
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

        console.log('User Função: ', userFuncao)

        //verifica se user exist
        if (!userFuncao) {
            logger.error('Utilizador não encontrado!')
            return res.status(422).json({ msg: 'Utilizador não encontrado!' })
        }

        //Verificar se user tem permissao para eliminar fluxo caixa
        if (userFuncao !== 'Gerente') {
            logger.error('Não tem permissão para eliminar fluxo caixas!')
            return res.status(422).json({ msg: 'Não tem permissão para eliminar fluxo caixas!' })
        }

        //get fluxo de caixas
        const result = await deleteFluxoCaixa(getId)

        //check is succes
        if (!result) {
            logger.error('Erro ao eliminar fluxo de caixa!')
            return res.status(422).json({ msg: 'Erro ao eliminar fluxo de caixa!' })
        }

        //Sucesso 
        logger.error('Dados de fluxo de caixa eliminado com sucesso!')
        return res.status(200).json({ msg: 'Dados de fluxo de caixa eliminado com sucesso!' })

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    abrirFCaixa,
    fecharFCaixa,
    listaFCaixas,
    listaFCaixa,
    eliminarFCaixa
}