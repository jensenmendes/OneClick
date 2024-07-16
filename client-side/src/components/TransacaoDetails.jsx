import React from 'react'
import TransacaoCardDetails from './TransacaoCardDetails'
import TransacaoCardTitle from './TransacaoCardTitle'
import TransacaoPriceDetails from './TransacaoPriceDetails'

const TransacaoDetails = () => {

  const transacaoData = [
    {
      produto:'Matutano', quantidade:1, preco:195.00, total: 195.00
    },
    {
      produto:'Agua Trindade 1.5L', quantidade:2, preco:75.00, total: 150.00
    },
    {
      produto:'Iogurte', quantidade:4, preco:95.00, total: 380.00
    },
    {
      produto:'Leite', quantidade:2, preco:145.00, total: 290.00
    }
  ]

  return (
    <div className='transaction-details'>
      <div className="transactionDetailsProduct">
          <TransacaoCardTitle />
          {transacaoData.map((data, index) => (
            <TransacaoCardDetails key={index} {...data} />
          ))}
      </div>
      <div className="transactionDetailsPrice">
            <TransacaoPriceDetails subTotal={1015} desconto={0.00} total={1015}/>
      </div>
    </div>
  )
}

export default TransacaoDetails