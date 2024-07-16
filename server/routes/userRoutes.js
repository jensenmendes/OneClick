//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')
const { internetRequired } = require('../utils/netConn')

//Importação
const { addUser, listOneUser, listUsers, atualizarUser, atualizarSenha, eliminarUser } = require('../controllers/userController')


//POST
route.post('/', generateToken, internetRequired, addUser)

//GET
route.get('/', generateToken, internetRequired, listUsers)

route.get('/:getId', generateToken, internetRequired, listOneUser)

//PUT
route.put('/:getId', generateToken, internetRequired, atualizarUser)

route.put('/', generateToken, internetRequired, atualizarSenha)

//DELETE
route.delete('/:getId', generateToken, internetRequired, eliminarUser)

module.exports = route