import React from 'react'

const FormRegistoFuncionarioCaixa = () => {
    return (
        <div className='reg-container'>
            <h2 className='reg-title'>Fluxo de Entrada</h2>

            <div className="reg-form-container">
                <form action="">
                    <div className="input-box">
                        <label htmlFor="">Caixa:</label>
                            <select name="" id="">
                                <option value="Caixa01">Caixa 1</option>
                                <option value="Caixa02">Caixa 2</option>
                                <option value="Caixa03">Caixa 3</option>
                            </select>
                    </div>
                    
                    <div className="input-box">
                        <label htmlFor="">Valor Encontrado:</label>
                        <input type="text" placeholder='Valor' name="" id="" />
                    </div>
                   
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    )
}

export default FormRegistoFuncionarioCaixa