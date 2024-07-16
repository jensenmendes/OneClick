//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//Create Categoria
async function createcategoria(nomeCategoria) {
    try {
        let pool = await sql.connect(config)

        let insertCategoria = await pool.request()
            .input('nome', sql.VarChar(150), nomeCategoria)
            .query(`INSERT INTO [OneClick].[dbo].[Categoria] (nomeCategoria) 
            VALUES (@nome)`);

        return insertCategoria.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List Categoria
async function getCategorias() {
    try {
        let pool = await sql.connect(config)


        let allCategoria = await pool.request().query('SELECT * FROM [OneClick].[dbo].[Categoria]')

        return allCategoria.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List One Categoria
async function getOneCategoria(id) {
    try {
        let pool = await sql.connect(config)


        let categoria = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT * FROM [OneClick].[dbo].[Categoria] WHERE id = @input_parameter')

        return categoria.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//DELETE Categoria
async function deleteCategoria(id) {
    try {
        let pool = await sql.connect(config)


        let categoria = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('DELETE FROM [OneClick].[dbo].[Categoria] WHERE id = @input_parameter')


        return categoria.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

async function checkCategoria(nomeCategoria) {
    try {
        let pool = await sql.connect(config)

        let categoria = await pool.request()
            .input('input_parameter', sql.VarChar(150), nomeCategoria)
            .query('SELECT id FROM [OneClick].[dbo].[Categoria] WHERE nomeCategoria = @input_parameter')

        if (categoria.recordset.length > 0) return categoria.recordset[0].id
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createcategoria,
    getCategorias,
    getOneCategoria,
    deleteCategoria,
    checkCategoria
}