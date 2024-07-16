import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import {
    FaLock
} from 'react-icons/fa'

const ResetPassword = () => {

    const [data, setData] = useState({
        senha:'',
        confSenha:''
    })

    const navigate = useNavigate()

    const [error, setError] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data, [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if(!data.senha.trim() || !data.confSenha.trim()){
            validationErrors.emptyFields = 'Preencha os campos!'
        }

        setError(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            alert('Form is successfully')
            setData({
                senha:'',
                confSenha:''
            })

            navigate('/')
        }else{
            setTimeout(() => {
                setError({})
            }, 5000)
        }
    }

    const handleCancelar = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div className="password-container">
            <div className='esq-form'>
                <h1>Reset Password</h1>
                <p>Insira uma nova senha para poder utilizar novamente o sistema</p>
                
                <form action="" onSubmit={handleSubmit}>
                    
                    <div className="input-box">
                        <div className="custom-icon">
                            <FaLock className='icon' />
                        </div>
                        <input type="password" name='senha' value={data.senha} onChange={handleChange} placeholder='Insira a Senha' />
                    </div>
                    <div className="input-box">
                        <div className="custom-icon">
                            <FaLock className='icon' />
                        </div>
                        <input type="password" name='confSenha' value={data.confSenha} onChange={handleChange} placeholder='Confirma Senha' />
                    </div>
                    <button type="submit">Confirmar</button>
                    {error && error.emptyFields && <span>{error.emptyFields}</span>}
                </form>
                <button className='btn-cancelar' onClick={handleCancelar}>Cancelar</button>
            </div>
        </div>
      )
}

export default ResetPassword