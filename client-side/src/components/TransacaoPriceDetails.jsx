import React from 'react'

const TransacaoPriceDetails = ({subTotal, desconto, total}) => {
  return (
    <div className='priceDetails'>
        <div className="subTotal">
            <div className="title">
                <span>Sub Total</span>
                <span>Desconto</span>
            </div>
            <div className="subTotalPrice">
                <span>{subTotal}</span>
                <span>{desconto}</span>
            </div>
        </div>
        <div className="finalPrice">
            <span className='totalTitle'>Total</span>
            <span>{total}</span>
        </div>
    </div>
  )
}

export default TransacaoPriceDetails