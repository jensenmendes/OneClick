//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')

//Importação
const { addPdv, listarPDV, listarOnePDV, eliminarPDV } = require('../controllers/pdvController')

//POST
route.post('/', generateToken, internetRequired, addPdv)

//GET
route.get('/', generateToken, internetRequired, listarPDV)

route.get('/:getId', generateToken, internetRequired, listarOnePDV)

//DELETE
route.delete('/:getId', generateToken, internetRequired, eliminarPDV)

module.exports = route