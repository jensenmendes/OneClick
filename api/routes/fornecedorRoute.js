require('dotenv').config();
//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Utilizador, Funcionario, Caixa, Cliente, Venda, TransacaoVenda, Produto, CategoriaProduto, Fornecedor } = require('../models');
const { json, where } = require('sequelize');


const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

//NEW FORNECEDOR
route.post('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { nome, email, telefone, telemovel, endereco } = req.body

    if (!nome || !email || !telefone || !telemovel || !endereco) return res.status(422).json({ msg: 'Preencha os campos' })

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

        const idFuncionario = user.idFuncionario

        const getFuncao = await Funcionario.findOne({
            attributes: ['funcao'],
            where: {
                id: idFuncionario
            }
        })

        const funcao = getFuncao.funcao

        if (funcao !== 'Gestor') return res.status(422).json({ msg: 'Não tem permissão para criar' })

        //verificar se o fornecedor já existe
        const checkFornecedor = await Fornecedor.findOne({
            where: { email: email }
        })

        if (!checkFornecedor) return res.status(422).json({ msg: 'Fornecedor já existe' })

        //armazenar novo fornecedor
        const newFornecedor = await Fornecedor.create({
            nome,
            email,
            telefone,
            telemovel,
            endereco
        })

        if (!newFornecedor) return res.status(422).json({ msg: 'Erro ao registar o novo fornecedor' })

        res.status(200), json({ msg: 'Novo Fornecedor no Sistema' })
    } catch (err) {
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
            attributes: ['idFuncionario'],
            where: {
                id: id
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

        if (funcao !== 'Gestor') return res.status(422).json({ msg: 'Não tem permissão ler os dados' })

        const getAll = await Fornecedor.findAll()

        res.status(200).json(getAll)
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

        const idFuncionario = user.idFuncionario

        const getFuncao = await Funcionario.findOne({
            attributes: ['funcao'],
            where: {
                id: idFuncionario
            }
        })

        const funcao = getFuncao.funcao

        if (funcao !== 'Gestor') return res.status(422).json({ msg: 'Não tem permissão ler os dados' })

        const getOne = await Fornecedor.findOne({
            where: {
                id: id
            }
        })

        if (!getOne) return res.status(422).json({ msg: 'Fornecedor não encontrado' })

        res.status(200).json(getOne)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

route.put('/:id', generateToken, async(req, res) => {
    const { id } = req.params
    const { telefone, telemovel, endereco } = req.body

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    if (!telefone || !telemovel || !endereco) return res.status(422).json({ msg: 'Preencha os campos' })

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

        if (funcao !== 'Gestor') return res.status(422).json({ msg: 'Não tem permissão para alterar dados' })

        const getOne = await Fornecedor.findOne({
            where: {
                id: id
            }
        })

        if (!getOne) return res.status(422).json({ msg: 'Fornecedor não encontrado' })

        const uptFornecedor = await Fornecedor.update({
            telefone,
            telemovel,
            endereco
        }, {
            where: {
                id: id
            }
        })

        if (!uptFornecedor) return res.status(422).json({ msg: 'Fornecedor não atualizado' })

        res.status(200).json({ msg: 'Fornecedor atualizado' })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

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

        if (funcao !== 'Gestor') return res.status(422).json({ msg: 'Não tem permissão para Eliminar' })

        //verificar antes todos os produtos associados ao utilizador

        const deleteOne = await Fornecedor.destroy({
            where: {
                id: id
            }
        })

        if (!deleteOne) return res.status(422).json({ msg: 'Erro ao eliminar o fornecedor' })

        res.status(200).json(getOne)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//verificar se é preciso eliminar ou criar uma coluna status, para em vez de eliminar alterar o status

module.exports = route