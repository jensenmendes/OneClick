//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Utilizador, Funcionario, Caixa, Cliente, Venda, TransacaoVenda, Produto } = require('../models');

const { format } = require('date-fns');

const { registarVenda, calcularTotal } = require('../modules/registarVenda')

require('dotenv').config();

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

//Transacao de Venda
route.post('/:idVenda', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { idVenda } = req.params
    const { produto, quantidade } = req.body

    let valorTotal = 0

    const iva = 0.15

    if (!produto || !quantidade) return res.status(422).json({ msg: 'Preencha os campos' })

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

        const checkVenda = await Venda.findOne({
            attributes: ['total', 'status'],
            where: {
                id: idVenda
            }
        })

        if (!checkVenda) return res.status(422).json({ msg: 'Venda não encontrada' })

        //Get total
        const vendaTotal = checkVenda.total

        //get status
        const vendaStatus = checkVenda.status

        if (vendaStatus === 'Pago') return res.status(422).json({ msg: 'Essa venda ja foi concluída' })

        const checkProduto = await Produto.findOne({
            attributes: ['id', 'preco', 'quantidade'],
            where: {
                nome: produto
            }
        })


        if (!checkProduto) return res.status(422).json({ msg: 'Produto não existe' })

        //get produto id
        const idProduto = checkProduto.id

        console.log('ID PRODUTO: ', idProduto)

        //get preco do produto
        const preco = checkProduto.preco
        console.log('check Produto: ', preco)

        //get quantidade de produto no stock
        const quantidadeP = checkProduto.quantidade

        //verificar se o produto tem quantidade existente para a venda
        if (quantidade > quantidadeP) return res.status(422).json({ msg: 'Não existe esse quantidade no stock' })

        //calculo de valor do produto
        valorTotal = preco * quantidade

        //calculo de remoção de quantidade de produto no stock
        const uptQuantP = quantidadeP - quantidade

        //calculo total da transação
        const calculoTotal = await calcularTotal(valorTotal, vendaTotal)

        console.log('Total: ', calculoTotal)

        //nova transação no BD
        const newTransacao = await TransacaoVenda.create({
            idProduto,
            quantida: quantidade,
            iva,
            total: valorTotal,
            idVenda
        })

        if (!newTransacao) return res.status(422).json({ msg: 'Erro ao registar uma transação' })

        //Atualizar a venda
        const updateVenda = await Venda.update({ total: calculoTotal }, {
            where: {
                id: idVenda
            }
        })

        if (!updateVenda) res.status(422).json({ msg: 'Erro ao atualizar a venda' })

        //Atualização do Stock
        const updStock = await Produto.update({ quantidade: uptQuantP }, {
            where: {
                id: idProduto
            }
        })

        if (!updStock) return res.status(422).json({ msg: 'Erro ao atualizar o stock' })

        console.log('Produto atualizado com sucesso')

        res.status(200).json({ msg: `http://localhost:8080/pagamento/${idVenda}` })

    } catch (err) {
        console.error(err.stack);
        console.error('Erro:', err);
        res.status(500).json({ error: err });
    }
})

//VENDEDOR PODE VER SOMENTE TRANSAÇÕES QUE ELE EXECUTOU

//get todos transações
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

        const getAll = await TransacaoVenda.findAll({
            include: [{
                model: Produto,
                as: 'produto',
                attributes: ['nome']
            }]
        })

        const printAll = getAll.map(ts => ({
            produto: ts.produto.nome,
            quantida: ts.quantida,
            iva: ts.iva,
            total: ts.total,
            idVenda: ts.idVenda
        }))

        res.status(200).json(printAll)
    } catch (err) {
        console.error(err.stack);
        console.error('Erro:', err);
        res.status(500).json({ error: err });
    }
})

//GET ONE TRANSACAO DE UMA VENDA 

//cancelar transacao por idVenda
route.delete('/:idVenda', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { idVenda } = req.params

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

        const delTS = await TransacaoVenda.destroy({
            where: {
                idVenda: idVenda
            }
        })

        if (!delTS) return res.status(422).json({ msg: 'Erro ao deletar a transação' })

        res.status(422).json({ msg: 'Transações eliminadas com sucesso' })
    } catch (err) {
        console.error(err.stack);
        console.error('Erro:', err);
        res.status(500).json({ error: err });
    }
})

module.exports = route