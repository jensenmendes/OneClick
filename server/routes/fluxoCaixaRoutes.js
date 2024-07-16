//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')

//Importação
const { abrirFCaixa, fecharFCaixa, listaFCaixa, listaFCaixas, eliminarFCaixa } = require('../controllers/fluxoCaixaController')

//POST
route.post('/abrirCaixa', generateToken, internetRequired, abrirFCaixa)
route.post('/fecharCaixa', generateToken, internetRequired, fecharFCaixa)

//GET
route.get('/', generateToken, internetRequired, listaFCaixas)

route.get('/:getId', generateToken, internetRequired, listaFCaixa)

//DELETE
route.delete('/:getId', generateToken, internetRequired, eliminarFCaixa)

module.exports = route