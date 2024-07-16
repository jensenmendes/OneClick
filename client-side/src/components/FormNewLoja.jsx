import React from 'react'

const FormNewLoja = () => {
    return (
        <div className='form-container'>
            <div className='reg-container'>
                <h2 className='reg-title'>Adicionar Loja</h2>
    
                <div className="reg-form-container">
                    <form action="">
                        <div className="input-box">
                            <label htmlFor="">Loja:</label>
                            <input type="text" placeholder='Nome Loja' name="" id="" />
                        </div>
                        <div className="input-box">
                            <label htmlFor="">Localização:</label>
                            <input type="text" placeholder='Nome Localização' name="" id="" />
                        </div>
                        <div className="input-duo">
                            <div className="input-body">
                                <label htmlFor="">Telefone:</label>
                                <input type="text" placeholder='Telefone' name="" id="" />
                            </div>
                            <div className="input-body">
                                <label htmlFor="">Telefone:</label>
                                <input type="text" placeholder='Telefone' name="" id="" />
                            </div>
                        </div>
                        
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormNewLoja