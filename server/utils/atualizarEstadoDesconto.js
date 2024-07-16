//FIle para atualizar estado desconto automatico
const logger = require('./logger')

//Importação
const { updateEstadoDesconto, getDescontoData } = require('../dbModels/descontoModel')

async function atualizarEstadoDesconto() {

    //Obter descontos
    const descontos = await getDescontoData()
    const today = new Date()

    //atualizar os descontos
    for (const desconto of descontos) {
        const dataInicio = desconto.dataInicio
        const dataFim = desconto.dataFim
        let novoEstado = ''

        if (today >= dataInicio && today <= dataFim) {
            novoEstado = 'Ativo'
        } else if (today > dataFim) {
            novoEstado = 'Ultrapassado'
        }

        if (novoEstado) {
            const getId = desconto.id
            const updateEstado = await updateEstadoDesconto(getId, novoEstado)

            if (!updateEstado) {
                logger.error('Erro ao atualizar desconto!')
            }
            logger.info('Estado do desconto atualizado!')
        }

    }

}

module.exports = { atualizarEstadoDesconto }