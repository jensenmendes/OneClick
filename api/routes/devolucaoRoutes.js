require('dotenv').config();
//Dependencies
const route = require('express').Router();
const { Router } = require('express');

//Sequelize
const { sequelize, Utilizador, Funcionario, Caixa, Cliente, Venda, TransacaoVenda, Produto, CategoriaProduto, Fornecedor, Devolucao } = require('../models');

//Format data
const { format, differenceInDays, parse } = require('date-fns');

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

const { imprimirReciboDevolucao } = require('../modules/imprimir');
//const { default: Categoria } = require('../../client-side/src/pages/Categoria');

//QUANDO UM PRODUTO FOR DEVOLVIDO NUMA VENDA JA NAO PODE SER MAIS DEVOLVIDO OUTRA VEZ
//PARA ISSO VERIFICAR NA COLUNA STATUS SE JA FOI DEVOLVIDO OU NÃO UM PRODUTO DE IDVENDA


route.post('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { numeroVenda, codigoProduto, quantDevolvida, motivo, metodo } = req.body

    if (!numeroVenda || !codigoProduto || !quantDevolvida || !motivo || !metodo) return res.status(422).json({ msg: 'Por favor preencha os campos' })

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

        //vericar a venda
        const getVenda = await Venda.findOne({
            attributes: ['data'],
            where: {
                id: numeroVenda
            }
        })

        if (!getVenda) return res.status(422).json({ msg: 'Venda não encontrada' })

        //Verificar se o produto esta na venda
        const getTransacao = await TransacaoVenda.findOne({
            attributes: ['quantida', 'total'],
            where: {
                idVenda: numeroVenda,
                idProduto: codigoProduto
            }
        })

        // Extrair os idProduto das transações 
        /*const idProdutosDaVenda = [];
        getTransacao.forEach(transacao => {
            idProdutosDaVenda.push(transacao.idProduto);
        });

        // Verificar se  existe na lista
        const produtoExiste = idProdutosDaVenda.includes(codigoProduto);*/

        if (!getTransacao) return res.status(422).json({ msg: 'Venda não encontrada' })

        // Obter a data da venda
        const dataVenda = getVenda.data

        // Converte 'dataVenda' para um objeto Date
        const dataVendaDate = parse(dataVenda, 'yyyy-MM-dd', new Date());

        // data de hoje
        const today = new Date();

        // Calcula a diferença em dias
        const difDays = differenceInDays(today, dataVendaDate);

        // Verificar se a diferença de dias
        if (difDays > 7) return res.status(422).json({ msg: 'Data de prazo de troca ultrapassada' })

        const getTotal = getTransacao.total

        const getQuantidade = getTransacao.quantida

        //verificar se a quantidade devolvida é maior que o que há em transação

        console.log('Quantidade transitada: ', getQuantidade)

        console.log('Quantidade devolvida: ', quantDevolvida)

        if (quantDevolvida > getQuantidade || quantDevolvida < getQuantidade) return res.status(422).json({ msg: 'Essa quantidade não é igual do que foi registado na transação' })

        //Verificar o metodo de devolução

        if (metodo === 'Devolucao em Dinheiro') {
            //Atualizar o stock
            const checkProduto = await Produto.findOne({
                attributes: ['quantidade'],
                where: {
                    id: codigoProduto
                }
            })

            if (!checkProduto) return res.status(422).json({ msg: 'Produto não encontrado' })

            const stock = checkProduto.quantidade

            const uptQuantidade = stock + quantDevolvida

            const uptStock = await Produto.update({ quantidade: uptQuantidade }, {
                where: {
                    id: codigoProduto
                }
            })

            if (!uptStock) return res.status(422).json({ msg: 'Erro ao atualizar o stock' })

            const status = "Devolvido"

            console.log('Stock atualizado com sucesso')

            console.log('Get Total: ', getTotal)

            //Registar a devolução
            const newDevolucao = await Devolucao.create({
                data: today,
                motivo,
                quantidade: quantDevolvida,
                metodo,
                status,
                valor: getTotal,
                idVenda: numeroVenda,
                idProduto: codigoProduto
            })

            if (!newDevolucao) return res.status(422).json({ msg: 'Erro ao registar a devolução' })

            const idDevolucao = newDevolucao.id

            //Imprimir recibo devolução
            const print = await imprimirReciboDevolucao(idDevolucao)

            if (!print) {
                console.log('Erro ao imprimir o recibo')
            } else {
                console.log(`Recibo salvo em: ${print}`);
            }

            res.status(200).json({ msg: 'Devolução registada' })
        } else if (metodo === 'Troca') { //Troca de Produto
            //Registar a devolução
            const newDevolucao = await Devolucao.create({
                data: today,
                motivo,
                quantidade: quantDevolvida,
                metodo,
                status: "Por concluir",
                valor: getTotal,
                idVenda: numeroVenda,
                idProduto: codigoProduto
            })

            if (!newDevolucao) return res.status(422).json({ msg: 'Erro ao registar a devolução' })

            const idDevolucao = newDevolucao.id

            //Por concluir
            res.status(200).json(`http://localhost:8080/devolucao/trocarProduto/${idDevolucao}`)
        }


    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})

route.put('/trocarProduto/:idDevolucao', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    //add categoria tambem
    const { idDevolucao } = req.params
    const { novoProduto, categoria, quantidade } = req.body

    if (!novoProduto || !quantidade || !categoria) return res.status(422).json({ msg: 'Preenche os campos' })

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

        const checkCategoria = await Categoria.findOne({
            attributes: ['id'],
            where: {
                nome: categoria
            }
        })

        if (!checkCategoria) return res.status(422).json({ msg: 'Categoria não encontrado' })

        const idCategoria = checkCategoria.id

        const checkProduto = await Produto.findOne({
            attributes: ['quantidade', 'preco'],
            where: {
                nome: novoProduto,
                idCategoria: idCategoria
            }
        })

        if (!checkProduto) return res.status(422).json({ msg: 'Produto não encontrado' })

        const getStock = checkProduto.quantidade

        const getPreco = checkProduto.preco

        if (quantidade > getStock) return res.status(422).json({ msg: 'Não existe essa quantidade no Stock' })

        const newStock = quantidade - getStock

        const getDevolucao = await Devolucao.findOne({
            attributes: ['valor'],
            where: {
                id: idDevolucao
            }
        })

        const total = quantidade * getPreco

        const getValor = getDevolucao.valor

        let valor = 0

        if (total > getValor) {
            valor = total - getValor

            console.log('Você deve pagar mais ' + valor + '$00 para a troca')
        } else if (total < getValor) {
            valor = getValor - total

            console.log('Troco: ', valor)
        } else {
            console.log('Não precisa pagar mais nada!')
        }

        //UPDATE STOCK
        const uptStock = await Produto.update({ quantidade: newStock }, {
            where: {
                nome: novoProduto
            }
        })

        if (!uptStock) return res.status(422).json({ msg: 'Erro ao atualizar o Stock' })

        //UPDATE DEVOLUCAO
        const uptDevolucao = await Devolucao.update({
            valor,
            status: 'Concluído'
        }, {
            where: {
                id: idDevolucao
            }
        })

        if (!uptDevolucao) return res.status(422).json({ msg: 'Erro ao atualizar a Devolução' })

        res.status(200).json({ msg: 'Troca feito com sucesso' })

    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})

//Get todos os devoluções
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


        const getALL = await Devolucao.findAll({
            include: [{
                model: Produto,
                as: 'produto',
                attributes: ['nome']
            }, {
                model: Cliente,
                as: 'cliente',
                attributes: ['nome']
            }]
        })

        const listDevolucao = getALL.map(dev => ({
            data: dev.data,
            motivo: dev.motivo,
            quantidade: dev.quantidade,
            metodo: dev.metodo,
            status: dev.status,
            idVenda: dev.idVenda,
            produto: dev.produto.nome ? dev.produto.nome : null,
            cliente: dev.cliente ? dev.cliente.nome : null
        }))

        res.status(200).json(listDevolucao)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})

//Get One
route.get('/:id', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { id } = req.params
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

        const getOne = await Devolucao.findOne({
            where: {
                id: id
            },
            include: [{
                    model: Produto,
                    as: 'produto',
                    attributes: ['nome']
                },
                {
                    model: Cliente,
                    as: 'cliente',
                    attributes: ['nome']
                }
            ]
        })

        if (!getOne) return res.status(422).json({ msg: 'Devolucao não encontrada' })

        const listDevolucao = getALL.map(dev => ({
            data: dev.data,
            motivo: dev.motivo,
            quantidade: dev.quantidade,
            metodo: dev.metodo,
            status: dev.status,
            idVenda: dev.idVenda,
            cliente: dev.cliente.nome,
            produto: dev.produto.nome
        }))

        res.status(200).json(listDevolucao)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Erro no servidor' })
    }
})

module.exports = route