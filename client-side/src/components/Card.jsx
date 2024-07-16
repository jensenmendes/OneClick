import React from 'react'

const Card = ({nome, valor, icon: Icon}) => {
  return (
    <div className="card">
        <div className="card-inner">
            <p>{valor} </p>
            {Icon && <Icon className='icon' />}
        </div>
        <p>{nome}</p>
    </div>
  )
}

export default Card