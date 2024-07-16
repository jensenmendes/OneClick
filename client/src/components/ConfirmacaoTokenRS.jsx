import React from 'react'
import './assets/css/ResetPassword.css'

export const ConfirmacaoTokenRS = () => {
  return (
    <div className='content'>
        <div className="error show"></div>
        <div className="login-area">
            <header>Get Token</header>
            <p className='paragraph'>Please write the token we sent to you via email to reset the password</p>
            <form action="" method="post">
                <div className="field f1">
                    <input type="text" name="token" id="token" placeholder='token' />
                </div>
                <div className="field f2">
                    <input type="submit" value="Confirmar" />
                    <a href="/">Cancelar</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ConfirmacaoTokenRS
