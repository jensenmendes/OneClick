import React from 'react'
import FormRegistoFuncionarioCaixa from '../components/FormRegistoFuncionarioCaixa'

const RegFuncCaixa = () => {
  return (
    <>
        <div className="container-content">
            <div className="container-title">
                <h3>Fluxo de Caixa</h3>
            </div>

            <div className="register-container">
                <FormRegistoFuncionarioCaixa />
            </div>
                

        </div>
    </>
  )
}

export default RegFuncCaixa