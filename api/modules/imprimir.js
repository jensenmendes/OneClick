//Sequelize
const { sequelize, Funcionario, Caixa, Cliente, Venda, TransacaoVenda, Pagamento, Produto, Devolucao } = require('../models');

const { format } = require('date-fns');

const fs = require('fs');
const PDFDocument = require('pdfkit');

async function printRecibo(idVenda) {
    try {
        const checkTS = await TransacaoVenda.findAll({
            include: [{
                model: Produto,
                as: 'produto',
                attributes: ['nome']
            }],
            where: {
                idVenda: idVenda
            }
        })

        if (!checkTS) {
            console.log('Erro ao encontrar a transação')
            return null
        }

        let data = format(new Date(), 'dd/MM/yyyy');

        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1;
        const ano = dataAtual.getFullYear();

        const theData = dia + '_' + mes + '_' + ano
        const horaAtual = dataAtual.getHours();
        const minutosAtuais = dataAtual.getMinutes();
        const segundosAtuais = dataAtual.getSeconds();

        const hora = horaAtual + '_' + minutosAtuais + '_' + segundosAtuais

        const doc = new PDFDocument();
        const printALL = `recibo_${idVenda}_${theData}_${hora}.pdf`;

        doc.pipe(fs.createWriteStream(printALL));

        // Adicione o conteúdo ao PDF
        doc.text('Recibo de Transações de Venda', { align: 'center', fontSize: 16 });

        checkTS.forEach(ts => {
            doc.text(`Produto: ${ts.produto.nome}`);
            doc.text(`Quantidade: ${ts.quantida}`);
            doc.text(`IVA: ${ts.iva}`);
            doc.text(`Total: ${ts.total}`);
            doc.moveDown(); // Adicione espaço entre as transações
        });

        doc.end();


        /*const printAll = checkTS.map(ts => ({
            produto: ts.produto.nome,
            quantida: ts.quantida,
            iva: ts.iva,
            total: ts.total
        }))*/

        return printALL
    } catch (err) {
        console.error(err)
    }
}

async function imprimirReciboDevolucao(idDevolucao) {
    try {
        const checkDevolucao = await Devolucao.findOne({
            attributes: ['quantidade', 'valor', 'data', 'idProduto'],
            where: {
                id: idDevolucao
            }
        })

        if (!checkDevolucao) return console.log('Devolução não encontrado')

        const doc = new PDFDocument();

        const printALL = `recibo_Devolucao_${idDevolucao}.pdf`;

        doc.pipe(fs.createWriteStream(printALL));

        // Adicione o conteúdo ao PDF
        doc.text('Devolução de Produto', { align: 'center', fontSize: 16 });

        // Adicione detalhes específicos da devolução ao PDF
        doc.text(`ID da Devolução: ${idDevolucao}`);
        doc.text(`Quantidade Devolvida: ${checkDevolucao.quantidade}`);
        doc.text(`Valor Devolvido: R$ ${checkDevolucao.valor.toFixed(2)}`);
        doc.text(`Data da Devolução: ${checkDevolucao.data}`);
        doc.text(`ID do Produto Devolvido: ${checkDevolucao.idProduto}`);

        // Finalize o PDF
        doc.end();

        return printALL

    } catch (err) {
        console.error(err)
    }
}

module.exports = { printRecibo, imprimirReciboDevolucao }