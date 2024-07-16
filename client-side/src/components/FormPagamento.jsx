import React from 'react'

const FormPagamento = () => {
    return (
        <div className='reg-container'>
            <div className="reg-form-container">
                <form action="">
                <div className="input-box">
                        <label htmlFor="">Metodo:</label>
                        <div className="inCheck">
                            <label htmlFor="">
                                <input type="checkbox" name="" id="" />Cartão
                            </label>
                            <label htmlFor="">
                                <input type="checkbox" name="" id="" />Dinheiro
                            </label>
                        </div>
                    </div>
                   <div className="input-box">
                        <label htmlFor="">Total:</label>
                        <input type="text" value={3000} name="" id="" readOnly/>
                    </div>

                    <div className="input-box">
                        <label htmlFor="">Valor Recibido:</label>
                        <input type="text" placeholder='Valor' name="" id="" />
                    </div>

                    <div className="input-box">
                        <label htmlFor="">Troco:</label>
                        <input type="text" value={0} name="" id="" readOnly />
                    </div>

                    <div className="input-box">
                        <label htmlFor="">Email:</label>
                        <input type="email" placeholder='Endereço de email' name="" id="" />
                    </div>
                    
                    <button type="submit">Pagar</button>
                </form>
            </div>
        </div>
)
}

export default FormPagamento