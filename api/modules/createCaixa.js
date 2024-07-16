//Sequelize
const { sequelize, Caixa } = require('../models');

async function newCaixa() {
    const caixa = 'Caixa'

    try {

        let nCaixa = ''
            //Pegar o total de registo feito
        const count = await Caixa.count()

        let x = count + 1

        if (x < 10) {
            nCaixa = caixa + ' 0' + x
        } else {
            nCaixa = caixa + x
        }

        return nCaixa
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = { newCaixa }