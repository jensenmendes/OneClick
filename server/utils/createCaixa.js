//Importação
const { countPDV } = require('../dbModels/pdvModel')

async function gerarPDV() {
    const pdv = 'PDV'

    let nPdv = ''

    const total = await countPDV()

    const y = parseInt(total) + 1

    if (y >= 1 && y <= 9) {
        nPdv = pdv + ' 0' + y
    } else {
        nPdv = pdv + y
    }

    return nPdv

}

module.exports = { gerarPDV }