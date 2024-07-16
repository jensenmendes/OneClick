import React from 'react'
import './assets/css/ResetPassword.css'

export const EnvioEmailRS = () => {
  return (
    <div className='content'>
        <div className="error show"></div>
        <div className="login-area">
            <header>Reset Password</header>
            <p className='paragraph'>Please enter the email address that you used to register, and we will send you a link to reset your password via Email.</p>
            <form action="" method="post">
                <div className="field f1">
                    <input type="email" name="email" id="email" placeholder='exemplo@gmail.cv' />
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

export default EnvioEmailRS
