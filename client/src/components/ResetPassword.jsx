import React from 'react'

export const ResetPassword = () => {
  return (
    <div className='content'>
        <div className="error show"></div>
        <div className="login-area">
            <header>Reset Password</header>
            <p className='paragraph'>Please write the new password to reset your account</p>
            <form action="" method="post">
                <div className="field f1">
                    <input type="password" name="senha" id="senha" placeholder='Senha' />
                </div>
                <div className="field f1">
                    <input type="password" name="confSenha" id="confSenha" placeholder='Confirmação Senha' />
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

export default ResetPassword
