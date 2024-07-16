//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//create desconto
async function createDesconto(descricao, dataInicio, dataFim, metodo, tipo, valor, estado) {
    try {
        let pool = await sql.connect(config)

        let insertDesconto = await pool.request()
            .input('descricao', sql.VarChar(150), descricao)
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('metodo', sql.VarChar(150), metodo)
            .input('tipo', sql.VarChar(150), tipo)
            .input('valor', sql.Decimal(10, 2), valor)
            .input('estado', sql.VarChar(150), estado)
            .query(`INSERT INTO [OneClick].[dbo].[Desconto] (descricao, dataInicio, dataFim, metodo, tipo, valor, estado) 
            VALUES (@descricao, @dataInicio, @dataFim, @metodo, @tipo, @valor, @estado)`);

        return insertDesconto.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//list descontos
async function getDescontos() {
    try {
        let pool = await sql.connect(config)


        let allDesconto = await pool.request().query('SELECT * FROM [OneClick].[dbo].[Desconto]')

        return allDesconto.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//list um desconto
async function getDesconto(id) {
    try {
        let pool = await sql.connect(config)


        let desconto = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT * FROM [OneClick].[dbo].[Desconto] WHERE id = @input_parameter')

        return desconto.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Obter descrição dos descontos
async function getDescontoData() {
    try {
        let pool = await sql.connect(config)


        let allData = await pool.request().query('SELECT id, descricao, dataInicio, dataFim FROM [OneClick].[dbo].[Desconto]')

        return allData.recordset


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}



//Atualizar desconto
async function updateDesconto(id, descricao, dataInicio, dataFim, metodo, tipo, valor) {
    try {
        let pool = await sql.connect(config)

        let updateDesconto = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('descricao', sql.VarChar(150), descricao)
            .input('dataInicio', sql.Date, dataInicio)
            .input('dataFim', sql.Date, dataFim)
            .input('metodo', sql.VarChar(150), metodo)
            .input('tipo', sql.VarChar(150), tipo)
            .input('valor', sql.Decimal(10, 2), valor)
            .query(`UPDATE [OneClick].[dbo].[Desconto] SET descricao = @descricao, dataInicio = @dataInicio,
                 dataFim = @dataFim, metodo = @metodo, tipo = @tipo, valor = @valor WHERE id = @input_parameter`);

        return updateDesconto.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Atualizar estado descontos automaticos
async function updateEstadoDesconto(id, estado) {
    try {
        let pool = await sql.connect(config)

        let updateEstado = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('estado', sql.VarChar(150), estado)
            .query(`UPDATE [OneClick].[dbo].[Desconto] SET estado = @estado WHERE id = @input_parameter`);

        return updateEstado.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//delete desconto
async function deleteDesconto(id) {
    try {
        let pool = await sql.connect(config)


        let desconto = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('DELETE FROM [OneClick].[dbo].[Desconto] WHERE id = @input_parameter')

        return desconto.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//check if exist desconto
async function checkDesconto(descricao) {
    try {
        let pool = await sql.connect(config)


        let desconto = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT id FROM [OneClick].[dbo].[Desconto] WHERE id = @input_parameter')


        if (desconto.recordset.length > 0) return desconto.recordset[0].id
        else return null

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createDesconto,
    getDescontos,
    getDesconto,
    getDescontoData,
    updateDesconto,
    updateEstadoDesconto,
    deleteDesconto,
    checkDesconto
}