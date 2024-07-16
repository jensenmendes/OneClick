//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Funcionario, Utilizador } = require('../models');

require('dotenv').config();

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

const { newCaixa } = require('../modules/createCaixa')

//GET ALL FUNCIONARIOS
route.get('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idFuncionario'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        const allFunc = await Funcionario.findAll()

        if (!allFunc) return res.status(422).json({ msg: 'Erro ao listar os funcionarios' })

        res.status(200).json(allFunc)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//GET ONE FUNCIONARIO

route.get('/:id', generateToken, async(req, res) => {
    //get id atraves de PARAMS(URL)
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

        //verifica se existe o funcionario
        const getFunc = await Funcionario.findOne({
            where: {
                id: id
            }
        })

        //no caso de não encontrar
        if (!getFunc) return res.status(422).json({ msg: 'Funcionario not found' })

        //retorna funcionario encontrado
        res.status(200).json(getFunc)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//SEARCH BY NAME
route.post('/byName', generateToken, async(req, res) => {
    const { nome } = req.body

    if (!nome) return res.status(422).json({ msg: 'campo vazio' })

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idFuncionario'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        const getFunc = await Funcionario.findAll({
            where: {
                nome: nome
            }
        })

        if (!getFunc) return res.status(422).json({ msg: 'Funcionario não encontrado' })

        res.status(200).json(getFunc)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//DELETE FUNCIONARIO
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

        const idFuncionario = user.idFuncionario

        const getFuncao = await Funcionario.findOne({
            attributes: ['funcao'],
            where: {
                id: idFuncionario
            }
        })

        const funcao = getFuncao.funcao

        if (funcao !== 'Gestor') return res.status(422).json({ msg: 'Não tem permissão para eliminar' })

        const getFuncionario = await Funcionario.findOne({
            attributes: ['funcao'],
            where: {
                id: id
            }
        })

        const funcFuncao = getFuncionario.funcao

        if (funcFuncao === 'Gestor') return res.status(422).json({ msg: 'Um gestor não pode eliminar outro gestor' })

        const delFuncionario = await Funcionario.destroy({
            where: {
                id: id
            }
        })

        if (!delFuncionario) return res.status(422).json({ msg: 'Erro ao eliminar o funcionario' })

        res.status(200).json({ msg: 'Funcionario eliminado com sucesso' })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


module.exports = route