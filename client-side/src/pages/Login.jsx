import React, { useState } from 'react'
import {
    FaLock,
    FaUserAlt
} from 'react-icons/fa'

import PosImage from '../assets/img/logo.JPG';
import '../assets/Login.css'
import { useNavigate } from 'react-router';


const Login = () => {

    const [data, setData] = useState({
        username:'',
        senha:''
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
        if(!data.username.trim() || !data.senha.trim()){
            validationErrors.emptyFields = 'Username ou senha está vazio!'
        }

        setError(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            alert('Form is successfully')
            setData({
                username:'',
                senha:''
            })

            navigate('/dashboard')
        }else{
            setTimeout(() => {
                setError({})
            }, 5000)
        }
    }

  return (
    <div className="container">
        <div className="left-side">
            <div className="img">
                <img src={PosImage} alt="" srcset="" />
            </div>
        </div>
        <div className="right-side">
            <div className="login-form">
                <div className="title">
                    <h1>Faça o seu Login</h1>
                    <div className="underline"></div>
                </div>
                <div className="login-body">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <div className="custom-icon">
                                        <FaUserAlt className='icon' />
                            </div>
                            <input type="text" name='username' value={data.username} onChange={handleChange} placeholder='Username' />
                        </div>
                        <div className="input-box">
                            <div className="custom-icon">
                                <FaLock className='icon'/>
                            </div>
                            <input type="password" name='senha' value={data.senha} onChange={handleChange} placeholder='Senha' />
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type='checkbox'/> Lembrar Utilizador
                            </label>
                            <a href="/esquecerPassword">Esqueceu Senha?</a>
                        </div>
                        <button type="submit">Login</button>
                        {error && error.emptyFields && <span>{error.emptyFields}</span>}
                    </form>
                </div>
            </div>
            <div className="copy-right">
                <p>&copy; 2023 Jensen. Todos os direitos reservados.</p>
            </div>
        </div>
    </div>
  )
}

export default Login