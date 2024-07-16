import React from 'react'
import {BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeAtFill, BsPersonCircle} from 'react-icons/bs'

export const Header = () => {
  return (
    <div className="container">
        <div className="header">
            <div className="menu-icon">
                <BsJustify className="icon"/>
            </div>
            <div className="header-left">
                <BsSearch className="icon"/>
            </div>
            <div className="header-right">
                <BsFillBellFill className="icon"/>
                <BsFillEnvelopeAtFill className="icon"/>
                <BsPersonCircle className="icon"/>
            </div>
        </div>
    </div>
  )
}

export default Header
