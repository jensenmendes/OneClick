import React from 'react'
import { FaTrash } from 'react-icons/fa'

const TransacaoCardDetails = ({produto, quantidade, preco, total}) => {
  return (
    <div className='transaction-card-details card-products'>
        <span className='product'>{produto}</span>
        <span className='product'>{quantidade}</span>
        <span className='product'>{preco}</span>
        <span className='product'>{total}</span>
        <span className='product'><FaTrash className='action-icon' /></span>
    </div>
  )
}

export default TransacaoCardDetails