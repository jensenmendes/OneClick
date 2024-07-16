import React, { useState } from 'react'

const FormNewDesconto = () => {

    return (
    
        <div className='reg-container'>
        
            <div className="reg-form-container">
                <form action="">
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Descrição:</label>
                            <input type="text" placeholder='Descrição' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Valor:</label>
                            <input type="text" placeholder='Valor' name="" id="" />
                        </div>
                    </div>

                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Data Inicio:</label>
                            <input type="date" placeholder='Data Inicio' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Data Fim:</label>
                            <input type="date" placeholder='Data Fim' name="" id="" />
                        </div>
                    </div>

                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Metodo:</label>
                            <select name="" id="">
                                <option value="Monetario">Monetario</option>
                                <option value="Percentual">Percentual</option>
                            </select>
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Tipo:</label>
                            <select name="" id="">
                                <option value="Venda">Venda</option>
                                <option value="Produto">Produto</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
   
  )
}

export default FormNewDesconto