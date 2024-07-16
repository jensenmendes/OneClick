import React from 'react'

const FormNewFornecedor = () => {
    return (
       
            <div className='reg-container'>
    
                <div className="reg-form-container">
                    <form action="">
                        <div className="input-box">
                            <label htmlFor="">Fornecedor:</label>
                            <input type="text" placeholder='Fornecedor' name="" id="" />
                        </div>
                        <div className="input-box">
                            <label htmlFor="">Email:</label>
                            <input type="email" placeholder='Email' name="" id="" />
                        </div>
                            
                        <div className="input-duo">
                            <div className="input-body">
                                <label htmlFor="">Zona:</label>
                                <input type="text" placeholder='Zona' name="" id="" />
                            </div>
                            <div className="input-body">
                                <label htmlFor="">Cidade:</label>
                                <input type="text" placeholder='Cidade' name="" id="" />
                            </div>
                        </div>
                        <div className="input-duo">
                            <div className="input-body">
                                <label htmlFor="">Ilha:</label>
                                <input type="text" placeholder='Ilha' name="" id="" />
                            </div>
                            <div className="input-body">
                                <label htmlFor="">País:</label>
                                <input type="text" placeholder='País' name="" id="" />
                            </div>
                        </div>
                        <div className="input-duo">
                            <div className="input-body">
                                <label htmlFor="">Telefone:</label>
                                <input type="text" placeholder='Telefone' name="" id="" />
                            </div>
                            <div className="input-body">
                                <label htmlFor="">Telemovel:</label>
                                <input type="text" placeholder='Telemovel' name="" id="" />
                            </div>
                        </div>
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            </div>
      
    )
}

export default FormNewFornecedor