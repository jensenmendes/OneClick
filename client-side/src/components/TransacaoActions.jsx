import React from 'react'
import VendasSaved from './VendasSaved'

const TransacaoActions = ({isModalOpen, setIsModalOpen, openModal}) => {

  //const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
    <div className='transacao-action'>
      <div className="sales-saved">
        <h3>Vendas Guardadas</h3>
        <input type="search" placeholder='Pesquisa por nº Venda' />
        <VendasSaved />
      </div>
      <div className="button-actions">
        <div className="fields">
          <button onClick={() => openModal('Produto')}>Produto</button>
          <button>Desconto</button>
          <button >Fatura</button>
        </div>
        <div className="fields">
          <button className='btn-cancelar'>Cancelar</button>
          <button>Guardar</button>
          <button onClick={() => openModal('Cliente')}>Cliente</button>
        </div>
        <button className='btn-pagar' onClick={() => openModal('Pagar')}>Pagamento</button>
      </div>
    </div>

   
    </>
    
  )
}

export default TransacaoActions