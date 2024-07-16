import React from 'react'
import { FaBell, FaEnvelope, FaUser } from 'react-icons/fa'
//import UserIcon from '../assets/img/usericon.png'
import UserIcon from '../assets/img/usericon.png'

const Navbar = () => {
    const tipoUser = "Gerente"
    const username = "Bety Mendes"
  return (
    <div className='header'>
        <div className="header-left">
            <h3>{tipoUser}</h3>
        </div>
        <div className="header-right">
            <FaBell className='icon'/>
            <FaEnvelope className='icon'/>
            <div className="user">
                <h3>{username}</h3>
                <img src={UserIcon} style={{width:'20px', borderRadius:'50%'}} alt="xxx" srcset="" />
            </div>
        </div>
    </div>
  )
}

export default Navbar