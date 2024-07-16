//Importar files
var config = require('../config/db')
const sql = require('mssql')
const logger = require('../utils/logger')

//Create User
async function createUser(pNome, uNome, email, username, password, funcao, telemovel, estado) {
    try {
        let pool = await sql.connect(config)

        let insertUser = await pool.request()
            .input('pNome', sql.VarChar(150), pNome)
            .input('uNome', sql.VarChar(150), uNome)
            .input('email', sql.VarChar(150), email)
            .input('username', sql.VarChar(150), username)
            .input('password', sql.VarChar(150), password)
            .input('funcao', sql.VarChar(150), funcao)
            .input('telemovel', sql.VarChar(150), telemovel)
            .input('estado', sql.VarChar(150), estado)
            .query(`INSERT INTO [OneClick].[dbo].[Utilizador] (primeiroNome, segundoNome, email, username, password, funcao, telemovel, estado) 
            VALUES (@pNome, @uNome, @email, @username, @password, @funcao, @telemovel, @estado)`);

        return insertUser.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Get User
async function getUsers(userFuncao) {
    try {
        let pool = await sql.connect(config)

        if (userFuncao === 'Admin') {
            let allUser = await pool.request().query('SELECT * FROM [OneClick].[dbo].[Utilizador]')

            return allUser.recordsets
        } else if (userFuncao === 'Gerente') {
            const x = 'Admin'
            const y = 'Gerente'
            let allUser = await pool.request()
                .input('admin', sql.VarChar(150), x)
                .input('gerente', sql.VarChar(150), y)
                .query('SELECT * FROM [OneClick].[dbo].[Utilizador] WHERE funcao not in (@admin, @gerente)')
            return allUser.recordsets
        }
        return null

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}


//Get One User
async function getOneUser(id, userFuncao) {
    try {
        let pool = await sql.connect(config)

        if (userFuncao === 'Admin') {
            let user = await pool.request()
                .input('input_parameter', sql.Int, id)
                .query('SELECT * FROM [OneClick].[dbo].[Utilizador] WHERE id = @input_parameter')

            return user.recordsets
        } else if (userFuncao === 'Gerente') {
            const x = 'Admin'
            const y = 'Gerente'
            let user = await pool.request()
                .input('input_parameter', sql.Int, id)
                .input('admin', sql.VarChar(150), x)
                .input('gerente', sql.VarChar(150), y)
                .query('SELECT * FROM [OneClick].[dbo].[Utilizador] WHERE id = @input_parameter AND funcao not in (@admin, @gerente)')

            return user.recordsets
        }

        return null

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Update User
async function updateUser(id, pNome, uNome, email, funcao, telemovel, estado, userFuncao) {
    try {
        let pool = await sql.connect(config)

        if (userFuncao === 'Admin') {
            let user = await pool.request()
                .input('input_parameter', sql.Int, id)
                .input('pNome', sql.VarChar(150), pNome)
                .input('uNome', sql.VarChar(150), uNome)
                .input('email', sql.VarChar(150), email)
                .input('funcao', sql.VarChar(150), funcao)
                .input('telemovel', sql.VarChar(150), telemovel)
                .input('estado', sql.VarChar(150), estado)
                .query('UPDATE [OneClick].[dbo].[Utilizador] SET primeiroNome = @pNome, segundoNome = @uNome, email = @email, funcao = @funcao, telemovel = @telemovel, estado = @estado  WHERE id = @input_parameter')

            return user.recordsets
        } else if (userFuncao === 'Gerente') {
            const x = 'Admin'
            const y = 'Gerente'
            let user = await pool.request()
                .input('input_parameter', sql.Int, id)
                .input('pNome', sql.VarChar(150), pNome)
                .input('uNome', sql.VarChar(150), uNome)
                .input('email', sql.VarChar(150), email)
                .input('funcao', sql.VarChar(150), funcao)
                .input('telemovel', sql.VarChar(150), telemovel)
                .input('estado', sql.VarChar(150), estado)
                .input('admin', sql.VarChar(150), x)
                .input('gerente', sql.VarChar(150), y)
                .query('UPDATE [OneClick].[dbo].[Utilizador] SET primeiroNome = @pNome, segundoNome = @uNome, email = @email, funcao = @funcao, telemovel = @telemovel, estado = @estado  WHERE id = @input_parameter AND funcao not in (@admin, @gerente)')

            return user.recordsets
        }

        return null

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Update Password
async function updateSenha(id, senha) {
    try {
        let pool = await sql.connect(config)
        let user = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('senha', sql.VarChar(150), senha)
            .query('UPDATE [OneClick].[dbo].[Utilizador] SET password = @senha WHERE id = @input_parameter')

        return user.recordsets
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Delete User
async function deleteUser(id) {
    try {
        let pool = await sql.connect(config)

        if (userFuncao === 'Admin') {
            let user = await pool.request()
                .input('input_parameter', sql.Int, id)
                .query('DELETE FROM [OneClick].[dbo].[Utilizador] WHERE id = @input_parameter')

            return user.recordsets
        } else if (userFuncao === 'Gerente') {
            const x = 'Admin'
            const y = 'Gerente'
            let user = await pool.request()
                .input('input_paramet', sql.Int, id)
                .input('admin', sql.VarChar(150), x)
                .input('gerente', sql.VarChar(150), y)
                .query('DELETE FROM [OneClick].[dbo].[Utilizador] WHERE id = @input_parameter AND funcao not in (@admin, @gerente)')

            return user.recordsets
        }
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}


//Particulars function needed


//check user function
async function getRole(id) {
    try {
        let pool = await sql.connect(config)

        let user = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT funcao FROM [OneClick].[dbo].[Utilizador] WHERE id = @input_parameter')

        if (user.recordset.length > 0) return user.recordset[0].funcao
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//check username
async function checkUsername(username) {
    try {
        let pool = await sql.connect(config)

        let user = await pool.request()
            .input('input_parameter', sql.VarChar(150), username)
            .query('SELECT username FROM [OneClick].[dbo].[Utilizador] WHERE username = @input_parameter')

        if (user.recordset.length > 0) return user.recordset[0].username
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Get User Password
async function getSenha(id) {
    try {
        let pool = await sql.connect(config)

        let user = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query('SELECT password FROM [OneClick].[dbo].[Utilizador] WHERE id = @input_parameter')

        if (user.recordset.length > 0) return user.recordset[0].password
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//User AUTH
async function authUser(username) {
    try {
        let pool = await sql.connect(config)

        let user = await pool.request()
            .input('username', sql.VarChar(150), username)
            .query('SELECT password FROM [OneClick].[dbo].[Utilizador] WHERE username = @username')

        if (user.recordset.length > 0) return user.recordset[0].password
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//GET ID OF USER LOGGED
async function getIdLogged(username) {
    try {
        let pool = await sql.connect(config)

        let user = await pool.request()
            .input('username', sql.VarChar(150), username)
            .query('SELECT id FROM [OneClick].[dbo].[Utilizador] WHERE username = @username')

        if (user.recordset.length > 0) return user.recordset[0].id
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Get User State
async function getUserState(username) {
    try {
        let pool = await sql.connect(config)

        let user = await pool.request()
            .input('username', sql.VarChar(150), username)
            .query('SELECT estado FROM [OneClick].[dbo].[Utilizador] WHERE username = @username')

        if (user.recordset.length > 0) return user.recordset[0].estado
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//get name of user authenticated
async function getUserAuthenticatedName(id) {
    try {
        let pool = await sql.connect(config)

        let user = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT primeiroNome, segundoNome FROM [OneClick].[dbo].[Utilizador] WHERE id = @id')

        const nome = user.recordset[0].primeiroNome + ' ' + user.recordset[0].segundoNome

        if (nome.length > 0) return nome
        else return null
    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

//Update user state of passive to ative
async function updateUserState(username) {
    try {
        let pool = await sql.connect(config)
        const state = 'Ativo'
        let user = await pool.request()
            .input('username', sql.VarChar(150), username)
            .input('state', sql.VarChar(150), state)
            .query('UPDATE [OneClick].[dbo].[Utilizador] SET estado = @state WHERE username = @username')

        return user.recordsets

    } catch (error) {
        logger.error(`Erro: ${error}`)
    }
}

module.exports = {
    createUser,
    getOneUser,
    getUsers,
    updateUser,
    updateSenha,
    deleteUser,
    getRole,
    checkUsername,
    getSenha,
    authUser,
    getIdLogged,
    getUserState,
    updateUserState,
    getUserAuthenticatedName
}