//Dependencies
const route = require('express').Router();
const { Router } = require('express');

const bcrypt = require('bcrypt')
    //Sequelize
const { sequelize, Utilizador, Estado, TipoUtilizador, UserRole, Permissao, Funcionario } = require('../models');

require('dotenv').config();

const { generateToken } = require('../modules/generateToken')

const jwt = require('jsonwebtoken')

//functions

const { generateRandomPassword, generateUsername, checkEstado, checkUserRole } = require('../modules/registerUser')

const { Model } = require('sequelize');

//CADA USER UNICO ROLE

//NEW USER
route.post('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    //Inserir os dados no field
    const { firstName, lastName, email, role } = req.body

    //gerar username and password
    let username = ''
    const senha = generateRandomPassword()

    let userExist = true

    //Verifica os campos se estão vazio
    if (!firstName || !lastName || !email || !role) {
        return res.status(422).json({ msg: 'Preencher os campos, por favor' });
    }

    //Determina o estado
    const estado = "passivo"

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        //verificar o tipo utilizador
        const idRole = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idRole
            }
        })

        if (getRole.role === 'Vendedor' || getRole.role === 'Gerente') return res.status(422).json({ msg: 'Sem permissão para criar utilizador' })

        //verificar se o user existe
        while (userExist) {
            username = generateUsername(firstName, lastName)
            const checkUser = await Utilizador.findOne({
                where: {
                    username: username
                }
            })

            //se não existir
            if (!checkUser) userExist = false
        }


        //Get id do estado
        const idEstado = await checkEstado(estado)

        console.log('ID ESTADO: ', idEstado)

        //Guardar no BD

        //HASHING PASSWORD
        const saltRounds = parseInt(8);
        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(senha, salt)

        //Get ID OF TIPO UTILIZADOR
        const checkRole = await TipoUtilizador.findOne({
            attributes: ['id'],
            where: {
                role: role
            }
        })

        if (!checkRole) return res.status(422).json({ msg: 'Role inexistente' })

        const roleId = checkRole.id

        //Utilizador

        const newUser = await Utilizador.create({
            firstName,
            lastName,
            username,
            email,
            senha: hashPassword,
            idEstado,
            idTipoUtilizador: roleId
        })

        //Verifica se o user foi guardado
        if (!newUser) {
            return res.status(422).json({ msg: 'Erro ao armazenar o utilizador no base de dados' })
        }

        console.log('Novo Utilizador criado, USERNAME: ' + username + 'and password: ' + senha)
        console.log('User has role: ', role)
        res.status(201).json({ msg: 'Utilizador guardado com sucesso' })

    } catch (error) {
        res.status(500).json({ error: error });
    }
})


//ADD ADMIN
route.post('/newAdmin', async(req, res) => {

    //Inserir os dados no field
    const { firstName, lastName, email, funcao } = req.body

    //gerar username and password
    let username = ''
        //const username = generateUsername(firstName, lastName)
    const senha = generateRandomPassword()

    let userExist = true

    console.log('FirstN: ', firstName)
    console.log('lastN: ', lastName)
    console.log('email: ', email)
    console.log('funcao: ', funcao)

    //Verifica os campos se estão vazio
    if (!firstName || !lastName || !email || !funcao) {
        return res.status(422).json({ msg: 'Preencher os campos, por favor' });
    }

    //Determina o estado
    const estado = "passivo"

    try {

        //verificar se o user existe
        while (userExist) {
            username = generateUsername(firstName, lastName)
            const checkUser = await Utilizador.findOne({
                where: {
                    username: username
                }
            })

            //se existir
            if (!checkUser) userExist = false
        }

        //Get id do estado
        const idEstado = await checkEstado(estado)


        const checkRole = await TipoUtilizador.findOne({
            attributes: ['id'],
            where: {
                role: funcao
            }
        })

        if (!checkRole) return res.status(422).json({ msg: 'Role não existe' })

        const idTipoUtilizador = checkRole.id

        //HASHING PASSWORD
        const saltRounds = parseInt(8);
        const salt = await bcrypt.genSalt(saltRounds)
        const hashPassword = await bcrypt.hash(senha, salt)

        //Utilizador
        const newUser = await Utilizador.create({
            firstName,
            lastName,
            username,
            email,
            senha: hashPassword,
            idEstado,
            idTipoUtilizador
        })

        //Verifica se o user foi guardado
        if (!newUser) {
            return res.status(422).json({ msg: 'Erro ao armazenar o utilizador no base de dados' })
        }

        res.status(201).json({ msg: `Novo Admin Cadastrado com seu username: ${username} and Password: ${senha}` })

    } catch (err) {
        res.status(500).json({ error: err });
    }
})

//CREATE NEW ESTADO
route.post('/estado', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    //Insererção valor no campo
    const { status } = req.body
        //Estados: ativo, passivo, suspenso

    //verifica o campo
    if (!status) {
        return res.status(422).json({ msg: 'Preencher o campo, por favor' });
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idFuncionario', 'idTipoUtilizador'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        //verificar o tipo utilizador
        const idRole = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idRole
            }
        })

        if (funcao !== 'Admin') return res.status(422).json({ msg: 'User não tem permissão para criar estado' })

        //verifica se o estado existe
        const checkEstado = await Estado.findOne({
            where: {
                status: status
            }
        })

        //no caso de existir
        if (checkEstado) {
            return res.status(422).json("Esse estado ja existe")
        }

        //criação de um new estado no bd
        const newEstado = await Estado.create({ status })

        //no caso de erro
        if (!newEstado) {
            return res.status(422).json({ msg: 'Não foi possivel criar um novo estado' })
        }

        //msg de sucesso
        res.status(201).json({ msg: 'Novo estado adicionado' })
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

//create ROLE
route.post('/createRole', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    //Insererção valor no campo
    const { role } = req.body

    //verifica o campo
    if (!role) {
        return res.status(422).json({ msg: 'Preencha o campo' })
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        //verificar o tipo utilizador
        const idRole = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idRole
            }
        })

        if (getRole.role !== 'Admin') return res.status(422).json({ msg: 'User não tem permissão para criar Role' })

        //verifica se o role existe
        const checkRole = await TipoUtilizador.findOne({
            where: {
                role: role
            }
        })

        //no caso de existir
        if (checkRole) {
            return res.status(422).json({ msg: 'Role existe' })
        }

        //new data no bd
        const newRole = await TipoUtilizador.create({ role })

        //no caso de erro
        if (!newRole) {
            return res.status(422).json({ msg: 'Não foi possivel criar um novo role' })
        }

        //msg de sucesso
        res.status(200).json({ msg: 'New Role criado' })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }


})

//CREATE NEW PERMISSION
route.post('/createPermission', async(req, res) => {
    //Insererção valor no campo
    const { permission } = req.body

    //verifica o campo
    if (!permission) {
        return res.status(422).json({ msg: 'Preencha o campo' })
    }

    try {
        //verifica se o role existe
        const checkPermission = await Permissao.findOne({
            where: {
                permissionName: permission
            }
        })

        //no caso de existir
        if (checkPermission) {
            return res.status(422).json({ msg: 'Essa permissao existe' })
        }

        //new data no bd
        const newPermission = await Permissao.create({ permissionName: permission })

        //no caso de erro
        if (!newPermission) {
            return res.status(422).json({ msg: 'Não foi possivel criar um novo Permissao' })
        }

        //msg de sucesso
        res.status(200).json({ msg: 'Novo Permissao criado' })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

})

//ROLE
route.post('/addRole', async(req, res) => {
    //Insererção valor no campo
    const { uuid, role } = req.body

    //verifica o campo
    if (!uuid || !role) {
        return res.status(422).json({ msg: 'Valor faltando' })
    }

    try {
        //verifica se o user existe
        const user = await Utilizador.findOne({
                attributes: ['id'],
                where: {
                    uuid: uuid
                }
            })
            //verifica se o tem esse role
        const existRole = await TipoUtilizador.findOne({
            attributes: ['id'],
            where: {
                role: role
            }
        })


        //no caso de não existir
        if (!user) return res.status(422).json({ msg: 'Esse utilizador não existe' })

        if (!existRole) return res.status(422).json({ msg: 'No BD não possui esse role' })


        //get ids
        const userId = user.id

        const roleId = existRole.id
        console.log('ID ROLE: ', roleId)
            //add to bd
        const addRole = await UserRole.create({ idTipoUtilizador: roleId, idUtilizador: userId })

        //check if not exist error
        if (!addRole) return res.status(422).json({ msg: 'Erro ao introduzir dados no BD' })

        //msg de sucesso
        res.status(200).json({ msg: 'User tem new role' })

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

})

//ALL USER
route.get('/', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        //verificar o tipo utilizador
        const idRole = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idRole
            }
        })

        if (getRole.role !== 'Admin') return res.status(422).json({ msg: 'User não tem permissão para listar Utilizadores' })

        //Levantar nomes de todos os utilizadores no BD
        const getUser = await Utilizador.findAll({
            include: [{
                    model: Estado,
                    as: 'status',
                    attributes: ['status']
                },
                {
                    model: TipoUtilizador,
                    as: 'Role',
                    attributes: ['role']
                }
            ],
            attributes: {
                exclude: ['idEstado', 'idTipoUtilizador']
            }
        })

        //Verificação
        if (!getUser) {
            return res.status(422).json({ msg: 'Falha ao carregar os dados' })
        }


        //Filtar dados que serão vistas
        const allUsers = getUser.map(user => ({
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            senha: user.senha,
            foto: user.foto,
            /*createdAt: user.createdAt,
            updatedAt: user.updatedAt,*/
            status: user.status.status,
            role: user.Role.role
        }));

        //Get todos os nomes
        return res.json(allUsers)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

//ONE USER
route.get('/:uuid', generateToken, async(req, res) => {
    //get user with uuid
    const { uuid } = req.params

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    try {


        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        //verificar o tipo utilizador
        const idRole = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idRole
            }
        })

        if (getRole.role !== 'Admin') return res.status(422).json({ msg: 'User não tem permissão para listar Users' })

        //check if users exists
        const OneUser = await Utilizador.findOne({
            where: {
                uuid: uuid
            },
            include: [{
                    model: Estado,
                    as: 'status',
                    attributes: ['status']
                },
                {
                    model: TipoUtilizador,
                    as: 'Role',
                    attributes: ['role']
                }
            ],
            attributes: {
                exclude: ['idEstado', 'idTipoUtilizador']
            }
        })

        //if dont exist
        if (!OneUser) {
            return res.status(422).json({ msg: 'Esse Utilizador não existe' })
        }

        //filtrar dados
        const getUser = {
            firstName: OneUser.firstName,
            lastName: OneUser.lastName,
            username: OneUser.username,
            email: OneUser.email,
            senha: OneUser.senha,
            foto: OneUser.foto,
            status: OneUser.status.status,
            role: OneUser.Role.role
        }

        //Get datas
        return res.json(getUser)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})


//UPDATE USER 

//ESTADO
route.put('/:uuid', async(req, res) => {

    //Atualização descrição total do utilizador, firstName, lastName, email, estado, role
    const { uuid } = req.params

    const { firstName, lastName, email, estado, role } = req.body

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    if (!firstName || !lastName || !email || !estado || !role) {
        return res.status(422).json({ msg: 'Preencha o campo' })
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const idLog = decodedToken.id;

        const findUser = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: idLog
            }
        })
        if (!findUser) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        //verificar o tipo utilizador
        const idRole = findUser.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idRole
            }
        })

        if (getRole.role !== 'Admin') return res.status(422).json({ msg: 'User não tem permissão para listar Users' })

        //find user
        const user = await Utilizador.findOne({
            where: {
                uuid: uuid
            }
        })

        if (!user) {
            return res.status(422).json({ msg: 'Esse Utilizador não existe' })
        }

        const checkEstado = await Estado.findOne({
            attributes: ['id'],
            where: {
                status: estado
            }
        })

        const checkRole = await TipoUtilizador.findOne({
            attributes: ['id'],
            where: {
                role: role
            }
        })

        if (!checkEstado) {
            return res.status(422).json({ msg: 'Esse Estado não existe' })
        }

        //Get id do estado and role
        const idEstado = checkEstado.id

        const getIdRole = checkRole.id

        const updUser = await Utilizador.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
            idEstado: idEstado,
            idTipoUtilizador: getIdRole
        }, {
            where: {
                uuid: uuid
            }
        })

        if (!updUser) {
            return res.status(422).json({ msg: 'Não foi possivel atualizar o estado' })
        }

        res.status(200).json({ msg: 'Estado atualizado com sucesso' })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

//PROFILE

//PASSWORD
route.put('/updatePassword/:uuid', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { uuid } = req.params
    const { oldPassword, newPassword, confPassword } = req.body

    if (!oldPassword || !newPassword || !confPassword) {
        return res.status(422).json({ msg: 'Preencha os campos' })
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador', 'senha'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        const tam = 8

        const userPass = user.senha

        console.log('old senha: ', userPass)

        if (oldPassword !== userPass) {
            return res.status(422).json({ msg: 'Senha velha errada' })
        }
        if (newPassword.length < 8) {
            return res.status(422).json({ msg: 'Senha curto' })
        }

        if (newPassword !== confPassword) {
            return res.status(422).json({ msg: 'Senha não combina' })
        }

        const updatePassword = await Utilizador.update({ senha: newPassword }, {
            where: {
                id: id
            }
        })

        if (!updatePassword) {
            return res.status(422).json({ msg: 'Erro ao atualizar o password' })
        }

        res.status(200).json({ msg: 'Senha atualizada com sucesso' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }
})

//DELETE USER
route.delete('/:uuid', generateToken, async(req, res) => {

    const accessToken = req.headers['authorization'].split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ msg: 'Token não encontrado' });
    }

    const { uuid } = req.params

    if (!uuid) {
        res.status(422).json({ msg: 'UUID desconhecido, verifica' })
    }

    try {

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const id = decodedToken.id;

        const user = await Utilizador.findOne({
            attributes: ['idTipoUtilizador'],
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({ msg: 'User não encontrado' });
        }

        //verificar o tipo utilizador
        const idRole = user.idTipoUtilizador

        const getRole = await TipoUtilizador.findOne({
            attributes: ['role'],
            where: {
                id: idRole
            }
        })

        if (getRole.role !== 'Admin') return res.status(422).json({ msg: 'User não tem permissão para eliminar Users' })

        //verificar para eliminar o user
        const deleteUser = await Utilizador.destroy({
            where: {
                uuid: uuid
            }
        })

        if (!deleteUser) return res.status(422).json({ msg: 'Erro ao eliminar o user' })

        res.status(200).json({ msg: 'User eliminado com sucesso' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro interno do servidor' });
    }

})

module.exports = route