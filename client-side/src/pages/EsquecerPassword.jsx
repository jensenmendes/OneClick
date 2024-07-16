import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import {
    FaEnvelope,
    FaUser
} from 'react-icons/fa'

const EsquecerPassword = () => {

    const [data, setData] = useState({
        username:'',
        email:''
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
        if(!data.username.trim() || !data.email.trim()){
            validationErrors.emptyFields = 'Email está vazio!'
        }

        setError(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            alert('Form is successfully')
            setData({
                username:'',
                email:''
            })

            navigate('/getToken')
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
            <h1>Envio Email</h1>
            <p>Insira o email e o seu username aqui para enviar o token</p>
            
            <form action="" onSubmit={handleSubmit}>
                <div className="input-box">
                        <div className="custom-icon">
                            <FaUser className='icon' />
                        </div>
                        <input type="text"  name='username' value={data.username} onChange={handleChange} placeholder='Username'/>
                </div>
                <div className="input-box">
                    <div className="custom-icon">
                        <FaEnvelope className='icon' />
                    </div>
                    <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='johndoe@email.com' />
                </div>
                <button type="submit">Confirmar</button>
                {error && error.emptyFields && <span>{error.emptyFields}</span>}
            </form>
            <button className='btn-cancelar' onClick={handleCancelar}>Cancelar</button>
        </div>
    </div>
  )
}

export default EsquecerPassword