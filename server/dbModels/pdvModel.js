//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//INSERT PDV TO SQL
async function createPDV(pdv, estado) {
    try {
        let pool = await sql.connect(config)

        let insertpdv = await pool.request()
            .input('pdv', sql.VarChar(150), pdv)
            .input('estado', sql.VarChar(150), estado)
            .query(`INSERT INTO [OneClick].[dbo].[Caixa] (nome, estado) 
            VALUES (@pdv, @estado)`);

        return insertpdv.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List PDVS
async function getPDVs() {
    try {
        let pool = await sql.connect(config)


        let allpdvs = await pool.request().query('SELECT * FROM [OneClick].[dbo].[Caixa]')

        return allpdvs.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List One PDV
async function getOnePdv(id) {
    try {
        let pool = await sql.connect(config)


        let pdv = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT * FROM [OneClick].[dbo].[Caixa] WHERE id = @input_parameter')

        return pdv.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Delete PDV
async function deletePDV(id) {
    try {
        let pool = await sql.connect(config)


        let pdv = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('DELETE FROM [OneClick].[dbo].[Caixa] WHERE id = @input_parameter')


        return pdv.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Verificar se pdv existe
async function checkPdv(pdv) {
    try {
        let pool = await sql.connect(config)

        let getPdv = await pool.request()
            .input('input_parameter', sql.VarChar(150), pdv)
            .query('SELECT id FROM [OneClick].[dbo].[Caixa] WHERE nome = @input_parameter')

        if (getPdv.recordset.length > 0) return getPdv.recordset[0].id
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//get state of pdv
async function getPdvState(pdv) {
    try {
        let pool = await sql.connect(config)

        let getPdv = await pool.request()
            .input('input_parameter', sql.VarChar(150), pdv)
            .query('SELECT estado FROM [OneClick].[dbo].[Caixa] WHERE nome = @input_parameter')

        if (getPdv.recordset.length > 0) return getPdv.recordset[0].estado
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Update pdv state
async function updatePdvState(pdv, estado) {
    try {
        let pool = await sql.connect(config)

        let updatePdv = await pool.request()
            .input('input_parameter', sql.VarChar(150), pdv)
            .input('estado', sql.VarChar(150), estado)
            .query('update [OneClick].[dbo].[Caixa] set estado = @estado WHERE nome = @input_parameter')

        return updatePdv.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Contar pdvs
async function countPDV() {
    try {
        let pool = await sql.connect(config)

        let pdv = await pool.request()
            .query('SELECT count(*) as totalPDV FROM [OneClick].[dbo].[Caixa]')

        if (pdv.recordset.length > 0) return pdv.recordset[0].totalPDV
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createPDV,
    getPDVs,
    getOnePdv,
    deletePDV,
    checkPdv,
    countPDV,
    getPdvState,
    updatePdvState
}