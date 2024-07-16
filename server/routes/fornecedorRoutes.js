//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')

//Importação
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')
const { createSupplier, listSuppliers, listOneSupplier, atualizarFornecedor, eliminaSupplier } = require('../controllers/fornecedorController')

//POST

route.post('/', generateToken, internetRequired, createSupplier)

//GET

route.get('/', generateToken, internetRequired, listSuppliers)

route.get('/:getId', generateToken, internetRequired, listOneSupplier)

//PUT

route.put('/:getId', generateToken, internetRequired, atualizarFornecedor)

//DELETE

route.delete('/:getId', generateToken, internetRequired, eliminaSupplier)

module.exports = route