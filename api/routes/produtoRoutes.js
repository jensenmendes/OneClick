//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Funcionario, Utilizador, Caixa, Cliente, Venda, TransacaoVenda, Produto, CategoriaProduto, Fornecedor, ProdutoFornecedor } = require('../models');

//Format data
const { format } = require('date-fns');

require('dotenv').config();

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

const { getFornecedorID } = require('../modules/registarVenda')

//registar produto
route.post('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { nome, preco, quantidade, categoria } = req.body

    if (!nome || !preco || !quantidade || !categoria) return res.status(422).json({ msg: 'Preencha os campos' })

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

        //verificar categoria
        const checkCategoria = await CategoriaProduto.findOne({
            attributes: ['id'],
            where: {
                nome: categoria
            }
        })

        if (!checkCategoria) return res.status(422).json({ msg: 'Não existe esse categoria' })

        //verificar se esse produto já existe
        const checkProduto = await Produto.findOne({
            attributes: ['quantidade', 'id'],
            where: {
                nome: nome
            }
        })

        if (checkProduto) {
            //atualizar quantidade e preco
            const quant = parseInt(checkProduto.quantidade)
            const altQuant = parseInt(quantidade)
            const uptQuant = altQuant + quant
            const uptProduto = await Produto.update({ quantidade: uptQuant, preco: preco }, {
                where: {
                    id: checkProduto.id
                }
            })

            if (!uptProduto) return res.status(422).json({ msg: 'Erro ao atualizar dados do Produto' })

            return res.status(200).json({ msg: 'Com novos dados produtos foi atualizado' })
        }

        const newProduto = await Produto.create({
            nome,
            preco,
            quantidade,
            idCategoria: checkCategoria.id
        })

        if (!newProduto) return res.status(422).json({ msg: 'Erro ao cadastrar o Produto' })

        const idProduto = newProduto.id

        console.log('Produto ID: ', idProduto)

        res.status(422).json({ msg: 'Produto cadastrado com sucesso' })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//fornecedor tem que tar cadastrado primeiro

//Atribuir Fornecedor a um produto
route.post('/atribuirFornecedor/:idProduto', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { idProduto } = req.params
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

        const idFornecedor = await getFornecedorID(nome, email, telefone, telemovel, endereco)

        const checkProduto = await Produto.findOne({
            where: {
                id: idProduto
            }
        })

        if (!checkProduto) return res.status(422).json({ msg: 'Produto não existe' })

        //Armazenar o fornecedor do prodoto
        const addFornecedor = await ProdutoFornecedor.create({
            idProduto,
            idFornecedor
        })

        if (!addFornecedor) return res.status(422).json({ msg: 'Erro ao registar o fornecedor do produto' })

        res.status(200).json({ msg: 'Produto registado com o seu fornecedor' })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//get ALL PRODUTOS
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

        const getProduto = await Produto.findAll({ include: [{ model: CategoriaProduto, as: 'categoria' }] })

        if (!getProduto) return res.status(422).json({ msg: 'Erro ao retornar os produtos' })

        const allProduto = getProduto.map(prod => ({
            nome: prod.nome,
            preco: prod.preco,
            quantidade: prod.quantidade,
            categoria: prod.categoria.nome
        }))

        console.log(allProduto)

        res.status(200).json(allProduto)
    } catch (err) {
        console.error('Erro:', err);
        console.error('Stack Trace:', err.stack);
        res.status(500).json({ error: err });
    }
})

//get One Produto
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

        const getProduto = await Produto.findOne({
            include: [{
                model: CategoriaProduto,
                as: 'categoria'
            }],
            where: {
                id: id
            }
        })

        if (!getProduto) return res.status(422).json({ msg: 'Produto não encontrado' })

        const allData = {
            nome: getProduto.nome,
            preco: getProduto.preco,
            quantidade: getProduto.quantidade,
            categoria: getProduto.categoria.nome
        }

        res.status(200).json(allData)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
})

route.put('/:id', generateToken, async(req, res) => {
    const { id } = req.params
    const { preco, quantidade } = req.body

    if (!preco || !quantidade) return res.status(422).json({ msg: 'Preencha os campos' })

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

        if (funcao !== 'Gestor') return res.status(422).json({ msg: 'Não tem permissão para atualizar' })

        //GET ATUAL VALOR DE QUANTIDADE
        const getProduto = await Produto.findOne({
            attributes: ['quantidade'],
            where: {
                id: id
            }
        })

        const quant = parseInt(getProduto.quantidade)

        const newQuant = parseInt(quantidade)

        const uptQ = quant + newQuant

        const updProduto = await Produto.update({ preco, quantidade: uptQ }, {
            where: {
                id: id
            }
        })

        if (!updProduto) return res.status(422).json({ msg: 'Erro ao atualizar o produto' })

        res.status(200).json({ msg: 'Produto atualizado com sucesso' })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//EM VEZ DE ELIMINAR, DESATIVAR

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

        const checkQuantidade = await Produto.findOne({
            attributes: ['quantidade'],
            where: {
                id: id
            }
        })

        if (!checkQuantidade) return res.status(422).json({ msg: 'Erro ao encontrar produto' })

        const qtd = checkQuantidade.quantidade

        if (qtd > 0) return res.status(422).json({ msg: 'Produto não pode ser eliminado do sistema porque ainda contem no stock' })

        const delProduto = await Produto.destroy({
            where: {
                id: id
            }
        })

        if (!delProduto) return res.status(422).json({ msg: 'Erro ao deletar o produto' })

        res.status(200).json({ msg: 'Produto removido com sucesso' })
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = route