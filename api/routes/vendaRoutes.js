//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Utilizador, Caixa, Cliente, Venda, TransacaoVenda, Produto, TipoUtilizador } = require('../models');

const { format } = require('date-fns');

const { registarVenda, calcularTotal } = require('../modules/registarVenda')

require('dotenv').config();

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

//Registar Venda
route.post('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { caixa } = req.body

    if (!caixa) return res.status(422).json({ msg: 'Regista na Caixa' })

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        const idTipoUser = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idTipoUser
            }
        })

        if (getRole.role !== 'Vendedor') return res.status(422).json({ msg: 'Não tem permissão para criar uma venda' })

        //verificar o estado da caixa
        const getCaixa = await Caixa.findOne({
            attributes: ['id', 'status'],
            where: {
                nomeCaixa: caixa
            }
        })

        if (!getCaixa) return res.status(422).json({ msg: 'Caixa não encontrado' })

        if (getCaixa.status !== 'Ativo') return res.status(422).json({ msg: 'Caixa não está ativado' })

        const idCaixa = getCaixa.id

        const newVenda = await registarVenda(idCaixa, id)

        res.status(200).json({ msg: `http://localhost:8080/transacaoVenda/${newVenda}` })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
})

route.get('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        const getIdRole = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: getIdRole
            }
        })

        /*if (getRole.role === 'Gerente') {

        }*/

        const getVendas = await Venda.findAll()

        res.status(200).json(getVendas)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

route.get('/:id', generateToken, async(req, res) => {
    const { id } = req.params

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const idUser = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idFuncionario'],
            where: {
                id: idUser
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        const getVenda = await Venda.findOne({
            where: {
                id: id
            }
        })

        if (!getVenda) return res.status(422).json({ msg: 'Erro ao retornar dados da venda' })

        res.status(200).json(getVenda)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})



//delete
route.delete('/:id', generateToken, async(req, res) => {
    const { id } = req.params

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const idUser = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idFuncionario'],
            where: {
                id: idUser
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        const getVenda = await Venda.findOne({
            attributes: ['status'],
            where: {
                id: id
            }
        })

        if (getVenda.status === 'Pago') return res.status(422).json({ msg: 'Essa venda já foi concluída' })

        const delVenda = await Venda.destroy({
            where: {
                id: id
            }
        })

        if (!delVenda) return res.status(422).json({ msg: 'Erro ao deletar o venda' })

        res.status(200).json({ msg: 'Venda deletado' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})

module.exports = route