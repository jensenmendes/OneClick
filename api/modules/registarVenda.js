//Sequelize
const { sequelize, Funcionario, Caixa, Cliente, Venda, TransacaoVenda, Fornecedor } = require('../models');

const { format } = require('date-fns');

async function registarVenda(caixa, id) {
    try {

        let total = 0

        let data = format(new Date(), 'dd/MM/yyyy');

        const dataAtual = new Date();

        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1;
        const ano = dataAtual.getFullYear();

        const theData = dia + '' + mes + '' + ano

        const horaAtual = dataAtual.getHours();
        const minutosAtuais = dataAtual.getMinutes();
        const segundosAtuais = dataAtual.getSeconds();
        const status = "Por Pagar"

        const hora = horaAtual + ':' + minutosAtuais + ':' + segundosAtuais

        const theHora = horaAtual + '' + minutosAtuais + '' + segundosAtuais

        const countRows = await Venda.count()

        const num = countRows + 1

        //Implementar depois
        const numeroVenda = num + '' + '' + theData + '' + theHora

        console.log('DATA: ', data)

        const newVenda = await Venda.create({
            data: dataAtual,
            hora,
            total,
            idCaixa: caixa,
            status,
            idUtilizador: id
        })

        if (!newVenda) return res.status(422).json({ msg: 'Erro ao registar a venda' })

        return newVenda.id

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
}

async function calcularTotal(valorTotal, vendaTotal) {

    const valor = valorTotal + vendaTotal

    return valor
}

//Get ID Fornecedor para atribuir a produto
async function getFornecedorID(nome, email, telefone, telemovel, endereco) {
    try {
        //verificar se o fornecedor já existe
        const checkFornecedor = await Fornecedor.findOne({
            where: { email: email }
        })

        if (checkFornecedor) {
            //get id
            return checkFornecedor.id
        }
        //armazenar novo fornecedor
        const newFornecedor = await Fornecedor.create({
            nome,
            email,
            telefone,
            telemovel,
            endereco
        })

        if (!newFornecedor) return res.status(422).json({ msg: 'Erro ao registar o novo fornecedor' })

        //Get ID
        return newFornecedor.id

    } catch (err) {
        console.log(err)
    }
}

module.exports = { registarVenda, calcularTotal, getFornecedorID }