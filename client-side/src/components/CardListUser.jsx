import React from 'react'

const CardListUser = ({primeiroNome, ultimoNome, email, funcao}) => {
  return (
    <div className='card-list-user'>
        <div className="data">
            <span>{primeiroNome}</span>
        </div>
        <div className="data">
            <span className="uNome">{ultimoNome}</span>
        </div>
        <div className="data d-email">
        <span className="email">{email}</span>
        </div>
        <div className="data">
            <span className="funcao">{funcao}</span>
        </div>
        
        
    </div>
  )
}

export default CardListUser