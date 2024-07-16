import React from 'react'

const FormNewMetodoPagam = () => {
    return (
        <div className='form-container'>
            <div className='reg-container'>
                <div className="reg-form-container">
                    <form action="">
                        <div className="input-box">
                            <label htmlFor="">Metodo:</label>
                            <input type="text" placeholder='Metodo Pagamento' name="" id="" />
                        </div>
                        
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormNewMetodoPagam