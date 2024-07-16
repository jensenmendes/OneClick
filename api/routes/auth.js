require('dotenv').config();
//Dependencies
const route = require('express').Router();
const { Router } = require('express');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models');
const { NUMBER } = require('sequelize');


//Sequelize
const { sequelize, Utilizador, Estado, TipoUtilizador, UserRole, Permissao, Funcionario, UserLogin } = require('../models');

//LOGIN
route.post('/login', async(req, res) => {
    const { username, senha } = req.body

    if (!username || !senha) {
        return res.status(422).json({ msg: 'Username ou Password está vazio' })
    }

    try {
        const findUser = await Utilizador.findOne({
            attributes: ['id', 'senha', 'idEstado'],
            where: {
                username: username
            }
        })

        if (!findUser) {
            return res.status(422).json({ msg: 'Username não encontrado' })
        }

        const pass = findUser.senha

        //check Password
        const verifiedPassword = await bcrypt.compare(senha, pass)

        if (!verifiedPassword) {
            return res.status(422).json({ msg: 'Senha errado' })
        }

        //verificar o estado
        const checkEstado = await Estado.findOne({
            attributes: ['status'],
            where: {
                id: findUser.idEstado
            }
        })

        if (checkEstado.status === 'suspenso') return res.status(422).json({ msg: 'Não pode efetuar o login, porque o estado está suspenso' })

        if (checkEstado.status === 'passivo') {
            //atualizar o user estado
            const estado = 'ativo'
            const getIDEstado = await Estado.findOne({
                attributes: ['id'],
                where: {
                    status: estado
                }
            })

            const uptEstado = await Utilizador.update({ idEstado: getIDEstado.id }, {
                where: {
                    username: username
                }
            })
        }

        //generate token acess and refresh token
        const secret = process.env.ACCESS_TOKEN_SECRET
        console.log('secret: ', secret)
        const accessToken = jwt.sign({
            id: findUser.id
        }, secret)

        const saveLogin = await UserLogin.create({
            username,
            token: accessToken
        })


        if (!saveLogin) return res.status(422).json({ msg: 'Erro ao salvar dados do Login' })

        res.status(200).json({ msg: `Login feito com sucesso, token de acesso: ${accessToken}` })

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
})

//Forgot Password
route.post('/forgotPassword', async(req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(422).json({ msg: 'Insere o email' })
    }

    try {
        const user = await Utilizador.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(422).json({ msg: 'Utilizador não encontrado' })
        }

        const getToken = generateToken(email)
        res.status(200).json({ msg: `Caro utilizador ${user.firstName + ' ' + user.lastName} aqui esta o token de reset o password: ${getToken}` })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
})

//TOKEN ACESSO

//RESET PASSWORD
route.post('/resetPassword', async(req, res) => {
    const { username, newPassword, confPassword } = req.body

    if (!username || !newPassword.trim() || !confPassword.trim()) {
        return res.status(422).json({ msg: 'Preencha os campos' })
    }

    try {

        if (newPassword.length < 8) {
            return res.status(422).json({ msg: 'Senha curto' })
        }

        if (newPassword !== confPassword) {
            return res.status(422).json({ msg: 'Password não combinam' })
        }

        const updateSenha = await Utilizador.update({ senha: newPassword }, {
            where: {
                username: username
            }
        })

        if (!updateSenha) {
            return res.status(422).json({ msg: 'Erro ao atualizar o password' })
        }

        res.status(200).json({ msg: 'Seu password foi resetado' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
})

module.exports = route