//Sequelize
const { sequelize, Utilizador, Estado, TipoUtilizador, UserRole, Permissao, Funcionario } = require('../models');

//generate username
function generateUsername(firstName, lastName) {
    var num = Math.floor(Math.random() * 900) + 100;
    const username = firstName.toLowerCase() + '' + lastName.toLowerCase() + '' + num
    return username
}

//generate password
function generateRandomPassword() {
    const length = 8; // Tamanho da senha
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    return password;
}

//criar um novo estado
async function checkEstado(estado) {

    //Verifica o estado
    const checkEstado = await Estado.findOne({
        attributes: ['id'],
        where: {
            status: estado
        }
    })

    //Estado não existir, vai criar
    if (!checkEstado) {
        const newEstado = await Estado.create({ status: estado })
        if (!newEstado) return res.status(422).json({ msg: 'Erro ao criar um novo estado' })

        console.log("Estado adicionado")
        console.log('IDESTADO: ', newEstado.id)
        return newEstado.id
    }

    console.log('IDNESTADO: ', checkEstado.id)
    return checkEstado.id
}

async function checkUserRole(funcao) {
    //verifica se o role existe
    const checkRole = await TipoUtilizador.findOne({
        where: {
            role: funcao
        }
    })

    //Role não existe e criar um novo
    if (!checkRole) {
        const newRole = await TipoUtilizador.create({ role: funcao })

        if (!newRole) return res.status(422).json({ msg: 'Erro ao criar um novo role para utilizador' })

        console.log('NEW ROLE adicionado')

        return newRole.id
    }

    return checkRole.id
}

module.exports = { generateRandomPassword, generateUsername, checkEstado, checkUserRole }