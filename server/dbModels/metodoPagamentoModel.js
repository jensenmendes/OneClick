//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//create meios pagamento
async function createMeiosPago(metodo) {
    try {
        let pool = await sql.connect(config)

        let insertMetodo = await pool.request()
            .input('metodo', sql.VarChar(150), metodo)
            .query(`INSERT INTO [OneClick].[dbo].[MetodoPagamento] (metodo) 
            VALUES (@metodo)`);

        return insertMetodo.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List meios pagamento
async function getMeiosPago() {
    try {
        let pool = await sql.connect(config)


        let allMeios = await pool.request().query('SELECT * FROM [OneClick].[dbo].[MetodoPagamento]')

        return allMeios.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List One Meio
async function getOneMeio(id) {
    try {
        let pool = await sql.connect(config)


        let meio = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT * FROM [OneClick].[dbo].[MetodoPagamento] WHERE id = @input_parameter')

        return meio.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//delete meio pagamento
async function deleteMeioPagamento(id) {
    try {
        let pool = await sql.connect(config)


        let meio = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('DELETE FROM [OneClick].[dbo].[MetodoPagamento] WHERE id = @input_parameter')


        return meio.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//check if exist meio pagamento
async function checkMeioPago(metodo) {
    try {
        let pool = await sql.connect(config)

        let meio = await pool.request()
            .input('input_parameter', sql.VarChar(150), metodo)
            .query('SELECT id FROM [OneClick].[dbo].[MetodoPagamento] WHERE metodo = @input_parameter')

        if (meio.recordset.length > 0) return meio.recordset[0].id
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createMeiosPago,
    getMeiosPago,
    getOneMeio,
    deleteMeioPagamento,
    checkMeioPago
}