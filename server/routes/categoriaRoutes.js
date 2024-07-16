//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')

//Importação
const { newCategoria, listasCategoria, listaCategoria, eliminaCategoria } = require('../controllers/categoriaController')

//POST
route.post('/', generateToken, internetRequired, newCategoria)

//GET
route.get('/', generateToken, internetRequired, listasCategoria)

route.get('/:getId', generateToken, internetRequired, listaCategoria)

//DELETE
route.delete('/:getId', generateToken, internetRequired, eliminaCategoria)

module.exports = route