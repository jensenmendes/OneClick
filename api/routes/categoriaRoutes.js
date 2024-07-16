require('dotenv').config();
//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Funcionario, Caixa, Cliente, Venda, TransacaoVenda, Produto, CategoriaProduto, Utilizador } = require('../models');

//Format data
const { format } = require('date-fns');

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

//CATEGORIA

route.post('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { nome } = req.body

    if (!nome) return res.status(422).json({ msg: 'Preencha o campo' })

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

        const checkIfExist = await CategoriaProduto.findOne({
            where: {
                nome: nome
            }
        })

        if (checkIfExist) return res.status(422).json({ msg: 'Esse categoria já esta cadastrado' })

        const regCategoria = await CategoriaProduto.create({ nome })

        if (!regCategoria) res.status(422).json({ msg: 'Erro ao cadastrar nova categoria' })

        res.status(200).json({ msg: 'Categoria inserida com sucesso' })
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
            attributes: ['idFuncionario'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        const getAll = await CategoriaProduto.findAll()

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

        const getOne = await CategoriaProduto.findOne({
            where: {
                id: id
            }
        })

        if (!getOne) return res.status(422).json({ msg: 'Categoria não encontrado' })

        res.status(200).json(getOne)
    } catch (err) {
        console.log(err)
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

        if (funcao !== 'Gestor') return res.status(422).json({ msg: 'Não tem permissão para eliminar' })

        //Verificar produto associado a essa categoria
        const checkCat = await Produto.findAll({
            where: {
                idCategoria: id
            }
        })

        if (checkCat) {
            //Alterar ID para 0
            const altCat = await Produto.update({ idCategoria: 0 }, {
                where: {
                    idCategoria: id
                }
            })
        }

        //Eliminar categoria
        const deleteOne = await CategoriaProduto.destroy({
            where: {
                id: id
            }
        })

        if (!deleteOne) return res.status(422).json({ msg: 'Categoria não encontrado' })

        res.status(200).json({ msg: 'Categoria Eliminado com sucesso' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
})


module.exports = route