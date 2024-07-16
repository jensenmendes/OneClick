import React from 'react'

const FormNewCliente = () => {
    return (
        <div className='reg-container'>

            <div className="reg-form-container">
                <form action="">
                    <div className="input-box">
                        <label htmlFor="">Nome:</label>
                        <input type="text" placeholder='John Doe' name="" id="" />
                    </div>
                    
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">EMAIL:</label>
                            <input type="email" placeholder='Endereço email' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">NIF:</label>
                            <input type="text" placeholder='NIF' name="" id="" />
                        </div>
                    </div>
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Ilha:</label>
                            <input type="text" placeholder='Ilha' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Localidade:</label>
                            <input type="text" placeholder='Localidade' name="" id="" />
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

export default FormNewCliente