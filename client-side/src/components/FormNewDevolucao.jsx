import React, { useState } from 'react'

const FormNewDevolucao = () => {

    const [metodo, setMetodo] = useState('')

    const [mostrarCamposTroca, setMostrarCamposTroca] = useState(false);

    const handleMetodoChange = (event) => {
      setMetodo(event.target.value);
  
      // Se o motivo for 'Troca', exibe os campos adicionais
      setMostrarCamposTroca(event.target.value === 'Troca');
    };

  return (
    <div className='form-container'>
        <div className='reg-container'>
            <h2 className='reg-title'>Devolução</h2>

            <div className="reg-form-container">
                <form action="">
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Número Venda:</label>
                            <input type="text" placeholder='Número Venda' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Codigo Produto:</label>
                            <input type="text" placeholder='Codigo Produto' name="" id="" />
                        </div>
                    </div>
                    <div className="input-duo">
                        <div className="input-body">
                            <label htmlFor="">Quantidade Devolvida:</label>
                            <input type="text" placeholder='Quantidade Devolvida' name="" id="" />
                        </div>
                        <div className="input-body">
                            <label htmlFor="">Metodo:</label>
                            <select name="" id="" onChange={handleMetodoChange}>
                                <option value="Devolucao em Dinheiro">Devolucao em Dinheiro</option>
                                <option value="Troca">Troca</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Motivo:</label>
                        <textarea name="" id="" cols="30" rows="2"></textarea>
                    </div>

                    {mostrarCamposTroca && (
                    <>
                        <h3 className="troca-title">Novo Produto</h3>
                        <div className="input-box">
                            <label htmlFor="">Categoria:</label>
                            <select name="" id="">
                                <option value="categoria1">Categoria1</option>
                                <option value="categoria2">Categoria2</option>
                                <option value="categoria3">Categoria3</option>
                            </select>
                        </div>
                        <div className="input-duo">
                            <div className="input-body">
                                <label htmlFor="">Produto:</label>
                                <select name="" id="">
                                    <option value="Produto1">Produto1</option>
                                    <option value="Produto2">Produto2</option>
                                    <option value="Produto3">Produto3</option>
                                </select>
                            </div>
                            <div className="input-body">
                                <label htmlFor="">Quantidade:</label>
                                <input type="text" placeholder='Quantidade' name="" id="" />
                            </div>
                        </div>
                        <div className="diff">
                            <h3>Diferença:</h3>
                            <p>345$00</p>
                        </div>
                    </>
                    )}

                    <button type="submit">Confirmar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FormNewDevolucao