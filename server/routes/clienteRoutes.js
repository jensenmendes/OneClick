//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')

//Importação
const { listaClientes, listaCliente, atualizarCliente, eliminarCliente } = require('../controllers/clienteController')

//POST

//GET
route.get('/', generateToken, internetRequired, listaClientes)

route.get('/:getId', generateToken, internetRequired, listaCliente)

//PUT
route.put('/:getId', generateToken, internetRequired, atualizarCliente)

//DELETE
route.delete('/:getId', generateToken, internetRequired, eliminarCliente)

module.exports = route