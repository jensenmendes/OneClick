//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')

//Importação
const { addDesconto, listaDescontos, listaDesconto, atualizarDesconto, eliminarDesconto } = require('../controllers/descontoController')

//POST
route.post('/', generateToken, internetRequired, addDesconto)

//GET
route.get('/', generateToken, internetRequired, listaDescontos)

route.get('/:getId', generateToken, internetRequired, listaDesconto)

//PUT
route.put('/:getId', generateToken, internetRequired, atualizarDesconto)

//DELETE
route.delete('/:getId', generateToken, internetRequired, eliminarDesconto)

module.exports = route