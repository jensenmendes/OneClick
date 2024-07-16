require('dotenv').config();
//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Caixa, Utilizador, TipoUtilizador } = require('../models');

const { newCaixa } = require('../modules/createCaixa')

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

//NEW CAIXA
route.post('/', generateToken, async(req, res) => {

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

        const idTipoUser = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idTipoUser
            }
        })

        if (getRole.role !== 'Gerente') return res.status(422).json({ msg: 'Não tem permissão para criar' })
        let nomeCaixa = ''

        let r = true

        while (r) {
            nomeCaixa = await newCaixa()
            console.log('nome Caixa: ', nomeCaixa)
            const checkCaixa = await Caixa.findOne({
                where: { nomeCaixa: nomeCaixa }
            })

            if (!checkCaixa) r = false

        }

        const status = "Ativo"

        const addCaixa = await Caixa.create({ nomeCaixa, status })

        res.status(200).json({ msg: 'Caixa adicionado' })
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ error: err });
    }
})

//GET ALL CAIXA
route.get('/', generateToken, async(req, res) => {
    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }
    try {

        //CHECK O TOKEN
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        //GET ID OF USER LOGADO
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

        if (getRole.role !== 'Gerente') return res.status(422).json({ msg: 'Não tem permissão para listar' })

        const all = await Caixa.findAll()

        if (!all) return res.status(422).json({ msg: 'Erro ao listar caixas' })

        res.status(200).json(all)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//GET ONE CAIXA
route.get('/:id', generateToken, async(req, res) => {
    const { id } = req.params
    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }
    try {

        //CHECK O TOKEN
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        //GET ID OF USER LOGADO
        const idUser = decodedToken.id;
        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: idUser
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

        if (getRole.role !== 'Gerente') return res.status(422).json({ msg: 'Não tem permissão para listar' })

        const all = await Caixa.findOne({
            where: {
                id: id
            }
        })

        if (!all) return res.status(422).json({ msg: 'Erro ao listar caixas' })

        res.status(200).json(all)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//Desativar caixa
route.put('/:id', generateToken, async(req, res) => {
    const { id } = req.params
    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }
    try {

        //CHECK O TOKEN
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        //GET ID OF USER LOGADO
        const idUser = decodedToken.id;

        //GET THE USER
        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: idUser
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

        if (getRole.role !== 'Gerente') return res.status(422).json({ msg: 'Não tem permissão para criar' })

        const status = "Desativado"

        const desativarCaixa = await Caixa.update({ status: status }, {
            where: {
                id: id
            }
        })

        if (!desativarCaixa) return res.status(422).json({ msg: 'Caixa não existe' })

        res.status(200).json({ msg: 'Caixa desativado com sucesso' })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = route