//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Utilizador, Funcionario, Caixa, Cliente, Venda, TransacaoVenda, Produto, Pagamento } = require('../models');

const { format } = require('date-fns');

const fs = require('fs');

require('dotenv').config();

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

//funções
const { printRecibo } = require('../modules/imprimir')


//Registar Pagamento
route.post('/:idVenda', generateToken, async(req, res) => {
    const { idVenda } = req.params
    const { metodo, valorRecebido } = req.body

    if (!metodo || !valorRecebido) return res.status(422).json({ msg: 'Preencher os campos, por favor!' })

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

        //verificar se a venda existe
        const checkVenda = await Venda.findOne({
            attributes: ['total', 'status'],
            where: {
                id: idVenda
            }
        })

        if (!checkVenda) return res.status(422).json({ msg: 'Venda não existe' })

        //Get total
        const valorTotal = checkVenda.total

        //get status
        const vendaStatus = checkVenda.status

        if (vendaStatus === 'Pago') return res.status(422).json({ msg: 'Essa venda ja foi concluída' })

        if (valorTotal > valorRecebido) return res.status(422).json({ msg: 'Venda não pode ser finalizada, dinheiro em falta' })

        const troco = valorRecebido - valorTotal

        let data = format(new Date(), 'dd/MM/yyyy');

        const dataAtual = new Date();
        const horaAtual = dataAtual.getHours();
        const minutosAtuais = dataAtual.getMinutes();
        const segundosAtuais = dataAtual.getSeconds();

        const hora = horaAtual + ':' + minutosAtuais + ':' + segundosAtuais

        const newPagamento = await Pagamento.create({
            metodo,
            valorTotal,
            valorRecebido,
            troco,
            data: dataAtual,
            hora,
            idVenda
        })

        if (!newPagamento) return res.status(422).json({ msg: 'Erro ao armazenar dados do Pagamento' })

        const status = "Pago"

        const updVenda = await Venda.update({ status: status }, {
            where: {
                id: idVenda
            }
        })

        if (!updVenda) return res.status(422).json({ msg: 'Erro ao atualizar status da venda' })

        console.log('STATUS DA VENDA ATUALIZADO')

        console.log('Valor Recebido: ', valorRecebido)
        console.log('Valor Total: ', valorTotal)
        console.log('Troco: ', troco)

        const imprimirRecibo = await printRecibo(idVenda) // depois o que fazer

        if (!imprimirRecibo) {
            console.log('Erro ao imprimir o recibo')
        } else {
            console.log(`Recibo salvo em: ${imprimirRecibo}`);
        }

        res.status(200).json({ msg: 'Pagamento efetuado com sucesso' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})


//USERS COM FUNCAO VENDEDOR PODEM VER PAGAMENTOS DAS VENDAS QUE ELES EFETUAREM

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

        /*if (funcao === 'Vendedor') {
            const getAll = await Pagamento.findAll({
                where: {
                    idFuncionario: idFuncionario
                }
            })

            return res.status(200).json(getAll)
        }*/

        const getAll = await Pagamento.findAll()

        res.status(200).json(getAll)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})



route.get('/:id', async(req, res) => {
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

        const getPagamento = await Pagamento.findOne({
            where: {
                id: id
            }
        })

        if (!getPagamento) return res.status(422).json({ msg: 'Pagamento não encontrado' })

        res.status(200).json(getPagamento)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})

module.exports = route