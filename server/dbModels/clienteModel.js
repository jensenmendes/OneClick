//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//Create Cliente
async function createCliente(nome, localidade, ilha, nif, email, telefone, telemovel, pontos) {
    try {
        let pool = await sql.connect(config)

        let insertCliente = await pool.request()
            .input('nome', sql.VarChar(150), nome)
            .input('localidade', sql.VarChar(150), localidade)
            .input('ilha', sql.VarChar(150), ilha)
            .input('nif', sql.VarChar(150), nif)
            .input('email', sql.VarChar(150), email)
            .input('telefone', sql.VarChar(150), telefone)
            .input('telemovel', sql.VarChar(150), telemovel)
            .input('pontos', sql.Int, pontos)
            .query(`INSERT INTO [OneClick].[dbo].[Cliente] (nome, localidade, ilha, nif, email, telefone, telemovel, pontos) 
            VALUES (@nome, @localidade, @ilha, @nif, @email, @telefone, @telemovel, @pontos)`);

        return insertCliente.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List Clientes
async function getClientes() {
    try {
        let pool = await sql.connect(config)


        let allCliente = await pool.request().query('SELECT * FROM [OneClick].[dbo].[Cliente]')

        return allCliente.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//List Cliente
async function getCliente(id) {
    try {
        let pool = await sql.connect(config)


        let cliente = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT * FROM [OneClick].[dbo].[Cliente] WHERE id = @input_parameter')

        return cliente.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Update Cliente
async function updateCliente(id, nome, localidade, ilha, nif, email, telefone, telemovel, pontos) {
    try {
        let pool = await sql.connect(config)

        let updateCliente = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('nome', sql.VarChar(150), nome)
            .input('localidade', sql.VarChar(150), localidade)
            .input('ilha', sql.VarChar(150), ilha)
            .input('nif', sql.VarChar(150), nif)
            .input('email', sql.VarChar(150), email)
            .input('telefone', sql.VarChar(150), telefone)
            .input('telemovel', sql.VarChar(150), telemovel)
            .input('pontos', sql.Int, pontos)
            .query(`UPDATE [OneClick].[dbo].[Cliente] SET nome = @nome, localidade = @localidade, ilha = @ilha,
                 nif = @nif, email = @email, telefone = @telefone, telemovel = @telemovel, pontos = @pontos`);

        return updateCliente.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//delete Cliente
async function deleteCliente(id) {
    try {
        let pool = await sql.connect(config)


        let cliente = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('DELETE FROM [OneClick].[dbo].[Cliente] WHERE id = @input_parameter')

        return cliente.recordsets


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//check cliente
async function checkCliente(nif) {
    try {
        let pool = await sql.connect(config)


        let cliente = await pool.request()
            .input('input_parameter', sql.VarChar(150), nif)
            .query('SELECT id FROM [OneClick].[dbo].[Cliente] WHERE nif = @input_parameter')


        if (cliente.recordset.length > 0) return cliente.recordset[0].id
        else return null


    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createCliente,
    getClientes,
    getCliente,
    updateCliente,
    deleteCliente,
    checkCliente
}