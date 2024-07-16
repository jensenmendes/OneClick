//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//open Fluxo Caixa
async function openFluxoCaixa(saldoInicial, entrada, idUtilizador, idCaixa) {
    try {
        let pool = await sql.connect(config)

        let insertFluxoCaixa = await pool.request()
            .input('saldoInicial', sql.Decimal(10, 2), saldoInicial)
            .input('entrada', sql.Date, entrada)
            .input('idUtilizador', sql.Int, idUtilizador)
            .input('idCaixa', sql.Int, idCaixa)
            .query(`INSERT INTO [OneClick].[dbo].[FluxoCaixa] (saldoInicial, entrada, idUtilizador, idCaixa) 
                OUTPUT INSERTED.id 
                VALUES (@saldoInicial, @entrada, @idUtilizador, @idCaixa)`);

        return insertFluxoCaixa.recordset[0].id;
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}


//List Fluxo Caixa
async function getFluxoCaixas() {
    try {
        let pool = await sql.connect(config)


        let allFluxoCaixa = await pool.request().query('SELECT * FROM [OneClick].[dbo].[FluxoCaixa]')

        return allFluxoCaixa.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List One Fluxo Caixa
async function getFluxoCaixa(id) {
    try {
        let pool = await sql.connect(config)


        let fluxoCaixa = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT * FROM [OneClick].[dbo].[FluxoCaixa] WHERE id = @input_parameter')

        return fluxoCaixa.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//close Fluxo Caixa
async function closeFluxoCaixa(id, saldoFinal, saida) {
    try {
        let pool = await sql.connect(config)

        let closeFluxoCaixa = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('saldoFinal', sql.Decimal(10, 2), saldoFinal)
            .input('saida', sql.Date, saida)
            .query(`UPDATE [OneClick].[dbo].[FluxoCaixa] SET saldoFinal = @saldoFinal, 
                  saida = @saida WHERE id = @input_parameter`);

        return closeFluxoCaixa.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Eliminar Fluxo Caixa
async function deleteFluxoCaixa(id) {
    try {
        let pool = await sql.connect(config)


        let fluxoCaixa = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('DELETE FROM [OneClick].[dbo].[FluxoCaixa] WHERE id = @input_parameter')

        return fluxoCaixa.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}


module.exports = {
    openFluxoCaixa,
    getFluxoCaixas,
    getFluxoCaixa,
    closeFluxoCaixa,
    deleteFluxoCaixa
}