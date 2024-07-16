//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//Create Fornecedor
async function createFornecedor(nomeEmpresa, zona, cidade, ilha, pais, email, telefone, telemovel) {
    try {
        let pool = await sql.connect(config)

        let insertFornecedor = await pool.request()
            .input('nomeEmpresa', sql.VarChar(150), nomeEmpresa)
            .input('zona', sql.VarChar(150), zona)
            .input('cidade', sql.VarChar(150), cidade)
            .input('ilha', sql.VarChar(150), ilha)
            .input('pais', sql.VarChar(150), pais)
            .input('email', sql.VarChar(150), email)
            .input('telefone', sql.VarChar(150), telefone)
            .input('telemovel', sql.VarChar(150), telemovel)
            .query(`INSERT INTO [OneClick].[dbo].[Fornecedor] (nomeEmpresa, zona, cidade, ilha, pais, email, telefone, telemovel) 
            VALUES (@nomeEmpresa, @zona, @cidade, @ilha, @pais, @email, @telefone, @telemovel)`);

        return insertFornecedor.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List Fornecedores
async function getFornecedores() {
    try {
        let pool = await sql.connect(config)

        let allFornecedor = await pool.request().query('SELECT * FROM [OneClick].[dbo].[Fornecedor]')

        return allFornecedor.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List One Fornecedor
async function getOneFornecedor(id) {
    try {
        let pool = await sql.connect(config)


        let fornecedor = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT * FROM [OneClick].[dbo].[Fornecedor] WHERE id = @input_parameter')

        return fornecedor.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Update Fornecedor
async function updateFornecedor(id, nomeEmpresa, zona, cidade, ilha, pais, email, telefone, telemovel) {
    try {
        let pool = await sql.connect(config)

        let updateFornecedor = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('nomeEmpresa', sql.VarChar(150), nomeEmpresa)
            .input('zona', sql.VarChar(150), zona)
            .input('cidade', sql.VarChar(150), cidade)
            .input('ilha', sql.VarChar(150), ilha)
            .input('pais', sql.VarChar(150), pais)
            .input('email', sql.VarChar(150), email)
            .input('telefone', sql.VarChar(150), telefone)
            .input('telemovel', sql.VarChar(150), telemovel)
            .query(`UPDATE [OneClick].[dbo].[Fornecedor] SET nomeEmpresa = @nomeEmpresa, zona = @zona, cidade = @cidade, ilha = @ilha, pais = @pais, email = @email, telefone = @telefone, telemovel = @telemovel WHERE id = @input_parameter`);

        return updateFornecedor.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//DELETE FORNECEDOR
async function deleteFornecedor(id) {
    try {
        let pool = await sql.connect(config)


        let fornecedor = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('DELETE FROM [OneClick].[dbo].[Fornecedor] WHERE id = @input_parameter')


        return fornecedor.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

async function checkSupplier(nomeEmpresa) {
    try {
        let pool = await sql.connect(config)

        let forncedor = await pool.request()
            .input('input_parameter', sql.VarChar(150), nomeEmpresa)
            .query('SELECT id FROM [OneClick].[dbo].[Fornecedor] WHERE nomeEmpresa = @input_parameter')

        if (forncedor.recordset.length > 0) return forncedor.recordset[0].id
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createFornecedor,
    getFornecedores,
    getOneFornecedor,
    updateFornecedor,
    deleteFornecedor,
    checkSupplier
}