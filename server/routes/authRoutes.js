//dependencies
const { Router } = require('express');
const route = require('express').Router();
const jwt = require('jsonwebtoken')


//Importação
const { userLogin } = require('../controllers/authController')
const { internetRequired } = require('../utils/netConn')

//LOGIN POST
route.post('/login', userLogin)

module.exports = route