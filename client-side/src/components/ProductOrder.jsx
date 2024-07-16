import React from 'react'

const ProductOrder = () => {
  return (
    <div className='product-Order'>
        <div className="section-1">
            <div className="codProduct">
                <h4>Codido Produto</h4>
                <p>123</p>
            </div>
            <div className="prod-fornecedor">
                <h4>Fornecedor</h4>
                <p>XPTO</p>
            </div>
            <div className="prod-embalagem">
                <h4>Embalagem</h4>
                <p>KG</p>
            </div>
            <div className="prod-price">
                <h4>Preço</h4>
                <p>220</p>
            </div>
        </div>
        <div className="section-2">
            <div className="prod-name">
                <h4>Nome Produto</h4>
                <p>Banana</p>
            </div>
            <div className="sub-section-2">
                <div className="prod-details">
                    <div className="prod-quant">
                        <h4>Quantidade</h4>
                        <p>1.56</p>
                    </div>
                    <div className="prod-qq">
                        <h4>XPTO</h4>
                        <p>XPTO</p>
                    </div>
                </div>
                <div className="prod-total">
                    <h4>Total</h4>
                    <p>340</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductOrder