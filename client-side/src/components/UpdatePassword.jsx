import React from 'react'

const UpdatePassword = () => {
  return (
    <div className='upt-password'>
        <h3>Atualiza Senha</h3>
       <form action="">
            
            <div className="input-box">
                <label htmlFor="">Senha Antiga:</label>
                <input type="password" placeholder='Senha' name="" id="" />
            </div> 
            <div className="input-box">       
                <label htmlFor="">Nova Senha:</label>
                <input type="password" placeholder='Senha' name="" id="" />
            </div>
            <div className="input-box">       
                <label htmlFor="">Confirmar Senha:</label>
                <input type="password" placeholder='Senha' name="" id="" />
            </div>
            <button type="submit">Atualizar</button>
        </form>
    </div>
  )
}

export default UpdatePassword