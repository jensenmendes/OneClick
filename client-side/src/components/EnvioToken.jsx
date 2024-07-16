import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import {
    FaKey
} from 'react-icons/fa'
const EnvioToken = () => {

    const [data, setData] = useState({
        token:''
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
        if(!data.token.trim()){
            validationErrors.emptyFields = 'Token está vazio!'
        }

        setError(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            alert('Form is successfully')
            setData({
                token:''
            })

            navigate('/resetPassword')
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
                <h1>Envio Token</h1>
                <p>Insira o token que foi enviado pelo seu email</p>
                
                <form action="" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <div className="custom-icon">
                            <FaKey className='icon' />
                        </div>
                        <input type="text" name='token' value={data.token} onChange={handleChange} placeholder='Insira o Token' />
                    </div>
                    <button type="submit">Confirmar</button>
                    {error && error.emptyFields && <span>{error.emptyFields}</span>}
                </form>
                <button className='btn-cancelar' onClick={handleCancelar}>Cancelar</button>
            </div>
        </div>
      )
}

export default EnvioToken