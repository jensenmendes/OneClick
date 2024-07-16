import React, { useState } from 'react'

const Caixa = () => {

    

  return (
    <div className="fluxoCaixa-form-container">
        <h3>Registo de fluxo caixa</h3>
        <form action="">
            <div className="field">
                <label htmlFor="">Caixa</label>
                <select name="" id="">
                    <option value="1">Caixa 01</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="">Data/Hora</label>
                <input type="text" value={'2024-01-23 08:30:32'} readOnly />
            </div>
            <div className="field">
                <label htmlFor="">Vendedor</label>
                <input type="text" value={'Oscar Mendes'} readOnly />
            </div>
            <div className="field">
                <label htmlFor="">Saldo Inicial</label>
                <input type="text" />
            </div>
            <button>Abrir Caixa</button>
        </form>
    </div>
  )
}

export default Caixa