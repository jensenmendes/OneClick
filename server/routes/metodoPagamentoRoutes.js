//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')

//Importação
const { addMetodoPagamento, listMetodoPagamento, listOneMetodoPagamento, eliminarMetodoPagamento } = require('../controllers/metodoPagamentoController')

//POST
route.post('/', generateToken, internetRequired, addMetodoPagamento)

//GET
route.get('/', generateToken, internetRequired, listMetodoPagamento)

route.get('/:getId', generateToken, internetRequired, listOneMetodoPagamento)

//DELETE
route.delete('/:getId', generateToken, internetRequired, eliminarMetodoPagamento)

module.exports = route