//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')

//Importação
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')
const { newProduto, listProdutos, listaOneProduto, atualizarProduto, eliminarProduto } = require('../controllers/produtoController')

//POST

route.post('/', generateToken, internetRequired, newProduto)

//GET

route.get('/', generateToken, internetRequired, listProdutos)

route.get('/:getId', generateToken, internetRequired, listaOneProduto)

//PUT

route.put('/:getId', generateToken, internetRequired, atualizarProduto)

//DELETE

route.delete('/:getId', generateToken, internetRequired, eliminarProduto)

module.exports = route