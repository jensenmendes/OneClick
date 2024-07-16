import React, { useState } from 'react'
import './assets/css/Login.css'
import 'font-awesome/css/font-awesome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

//importando imagem
import posImg from './assets/img/pos.png'


export const LoginPage = () => {
  //Variaveis de Formulario
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  //Variavel de Navegação
  const navigate = useNavigate()

  //Variaveis de Erro
  const [error, setError] = useState({})

  //Evento de mudança
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,[name] : value
    })
  }

  //Evento de Submissão de formulário
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}
    if(!formData.username.trim() || !formData.password.trim()){
      validationErrors.emptyFields = "Username ou password está vazio!"
      console.log("username: ",formData.username)
      console.log("password: ",formData.password)
    }
    
    setError(validationErrors)

    if(Object.keys(validationErrors).length === 0){
      alert("Form is succesfully")
      setFormData({
        username: '',
        password:''
      });
      //Go to Dashboard
      navigate('/Dashboard')
    }else {
      setTimeout(() => {
        setError({});
      }, 5000);
    }

  }

  return (
    <div className='container'>
      <div className="col-left">
        <div className="img">
          <img src={posImg} alt="" srcSet="" />
        </div>
      </div>
      <div className="col-right">
        <div className="form">
          <div className="head">
            <div className="text"><h2>Faça seu Login</h2></div>
            <div className="underline"></div>
          </div>
          <div className="login-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="input-box">
                <input type="text" placeholder='username' name="username" value={formData.username} onChange={handleChange}/>
                <div className="custom-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
              <div className="input-box">
                <input type="password" placeholder='Password' name="password"  value={formData.password} onChange={handleChange}/>
                <div className="custom-icon">
                  <FontAwesomeIcon icon={faLock} />
                </div>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type='checkbox'/> Lembrar Utilizador
                </label>
                <a href="/ForgotPassword">Esqueceu Senha?</a>
              </div>

              <button type='submit'>Login</button>
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

export default LoginPage
