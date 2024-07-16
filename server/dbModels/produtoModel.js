//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//CREATE PRODUTO
async function createProduct(nomeProduto, quantidade, preco, custo, estado, imagem, idFornecedor, idCategoria) {
    try {
        let pool = await sql.connect(config)

        let insertProduto = await pool.request()
            .input('nomeProduto', sql.VarChar(150), nomeProduto)
            .input('quantidade', sql.Decimal(10, 2), quantidade)
            .input('preco', sql.Decimal(10, 2), preco)
            .input('custo', sql.Decimal(10, 2), custo)
            .input('estado', sql.VarChar(150), estado)
            .input('imagem', sql.VarChar(150), imagem)
            .input('idFornecedor', sql.Int, idFornecedor)
            .input('idCategoria', sql.Int, idCategoria)
            .query(`INSERT INTO [OneClick].[dbo].[Produto] (nomeProduto, quantidade, preço, custo, estado, imagem, idFornecedor, idCategoria) 
            VALUES (@nomeProduto, @quantidade, @preco, @custo, @estado, @imagem, @idFornecedor, @idCategoria)`);

        return insertProduto.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//LIST PRODUTO
async function getProducts() {
    try {
        let pool = await sql.connect(config)

        let allProduto = await pool.request().query('SELECT * FROM [OneClick].[dbo].[Produto]')

        return allProduto.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//LIST ONE PRODUTO
async function getOneProduct(id) {
    try {
        let pool = await sql.connect(config)


        let produto = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT * FROM [OneClick].[dbo].[Produto] WHERE id = @input_parameter')

        return produto.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//UPDATE PRODUTO
async function updateProduct(id, nomeProduto, quantidade, preco, custo, estado, idFornecedor, idCategoria) {
    try {
        let pool = await sql.connect(config)

        let updateProduto = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('nomeProduto', sql.VarChar(150), nomeProduto)
            .input('quantidade', sql.Decimal(10, 2), quantidade)
            .input('preco', sql.Decimal(10, 2), preco)
            .input('custo', sql.Decimal(10, 2), custo)
            .input('estado', sql.VarChar(150), estado)
            .input('idFornecedor', sql.Int, idFornecedor)
            .input('idCategoria', sql.Int, idCategoria)
            .query(`UPDATE [OneClick].[dbo].[Produto] SET nomeProduto = @nomeProduto, quantidade = @quantidade, preço = @preco, custo = @custo, estado = @estado, idFornecedor = @idFornecedor, idCategoria = @idCategoria WHERE id = @input_parameter`);

        return updateProduto.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//DELETE PRODUTO
async function deleteProduct(id) {
    try {
        let pool = await sql.connect(config)


        let produto = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('DELETE FROM [OneClick].[dbo].[Produto] WHERE id = @input_parameter')


        return produto.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

async function checkProduct(nomeProduto) {
    try {
        let pool = await sql.connect(config)

        let produto = await pool.request()
            .input('input_parameter', sql.VarChar(150), nomeProduto)
            .query('SELECT id FROM [OneClick].[dbo].[Produto] WHERE nomeProduto = @input_parameter')

        if (produto.recordset.length > 0) return produto.recordset[0].id
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    checkProduct
}