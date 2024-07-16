import React from 'react'
import {BsCart3, BsGrid3X3GapFill, BsFillBarChartFill} from 'react-icons/bs'
import {FaCog, FaStore} from 'react-icons/fa'
export const Sidebar = () => {
  return (
    <div id="sidebar">
        <div className="sidebar-title">
            <div className="sidebar-brand">
                <BsCart3 className="icon_header" /> POS System
            </div>
            <span className="icon close_icon">X</span>
        </div>

        <ul className="sidebar-list">
            <li className="sidebar-list-item">
                <a href="/Dashboard">
                    <BsGrid3X3GapFill className="icon" /> Dashboard
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/Vendas">
                    <BsCart3 className="icon" /> Vendas
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="#">
                    <BsCart3 className="icon" /> Clientes
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="#">
                    <BsCart3 className="icon" /> Produtos
                </a>
            </li>
            <li className="sidebar-list-item"> 
                <a href="#">
                    <BsCart3 className="icon" /> Stock
                </a>
            </li>
            <li className="sidebar-list-item"> 
                <a href="#">
                    <FaStore className="icon" /> Loja
                </a>
            </li>
            <li className="sidebar-list-item"> 
                <a href="#">
                    <BsCart3 className="icon" /> Devolução
                </a>
            </li>
            <li className="sidebar-list-item"> 
                <a href="#">
                    <BsFillBarChartFill className="icon" /> Relatórios
                </a>
            </li>
            <li className="sidebar-list-item"> 
                <a href="#">
                    <FaCog className="icon" /> Settings
                </a>
            </li>
            <li className="sidebar-list-item"> 
                <a href="#">
                    <BsCart3 className="icon" /> Help
                </a>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar
