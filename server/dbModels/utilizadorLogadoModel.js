//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//add user
async function addUserLogado(utilizador, pdv, referencia, token) {
    try {
        let pool = await sql.connect(config)

        let insertUtilizadorLogado = await pool.request()
            .input('utilizador', sql.VarChar(150), utilizador)
            .input('pdv', sql.VarChar(150), pdv)
            .input('referencia', sql.Int, referencia)
            .input('token', sql.VarChar(150), token)
            .query(`INSERT INTO [OneClick].[dbo].[UtilizadorLogado] (utilizador, pdv, referencia, token) 
                OUTPUT INSERTED.id 
                VALUES (@utilizador, @pdv, @referencia, @token)`);

        return insertUtilizadorLogado.recordset[0].id;
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

async function getReferencia(getToken) {
    try {
        let pool = await sql.connect(config)

        let token = await pool.request()
            .input('token', sql.VarChar(250), getToken)
            .query('SELECT referencia FROM [OneClick].[dbo].[UtilizadorLogado] WHERE token = @token')

        if (token.recordset.length > 0) return token.recordset[0].referencia
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

async function getPdvOpen(getToken) {
    try {
        let pool = await sql.connect(config)

        let token = await pool.request()
            .input('token', sql.VarChar(250), getToken)
            .query('SELECT pdv FROM [OneClick].[dbo].[UtilizadorLogado] WHERE token = @token')

        if (token.recordset.length > 0) return token.recordset[0].pdv
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    addUserLogado,
    getReferencia,
    getPdvOpen
}