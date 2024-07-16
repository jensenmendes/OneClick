import React from 'react'

const FormNewProductSale = () => {
    return (
            <div className='reg-container'>
                <div className="reg-form-container">
                    <form action="">
                        <div className="input-box">
                            <label htmlFor="">Produto:</label>
                             <input type="text" placeholder='Nome Produto' name='' id=''/>
                        </div>
                       <div className="input-box">
                            <label htmlFor="">Quantidade:</label>
                            <input type="text" placeholder='Quantidade' name="" id="" />
                        </div>
                        
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            </div>
    )
}

export default FormNewProductSale