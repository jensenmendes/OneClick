import React, { useState } from 'react'
import { FaBars, 
    FaShoppingBag, 
    FaShoppingCart, 
    FaChartLine, 
    FaMoneyCheckAlt,
    FaUser, 
    FaUserTie,
    FaTruck,
    FaTag,
    FaChartBar,
    FaSignOutAlt,
    FaTools, 
    FaQuestion,
    FaUserAlt,
    FaCashRegister,
    FaUndo,
    FaCreditCard,
    FaPercent} from 'react-icons/fa'
import { FiGrid } from 'react-icons/fi';
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'

const Sidebar = ({children}) => {

    const userType = 'Gerente'

    let menuItem = ['']

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    const iconSize = 14

    const dashboardItem = [
        {
            path:'/dashboard',
            name:'Dashboard',
            icon:<FiGrid size={iconSize} />
        }
    ]

    const settingsItem = [
        {
            path:'/settings',
            name:'Settings',
            icon:<FaTools size={iconSize} />
        }
    ]

    const helpItem = [
        {
            path:'/',
            name:'Help',
            icon:<FaQuestion size={iconSize} />
        }
    ]

    const logOutItem = [
        {
            path:'/',
            name:'Logout',
            icon:<FaSignOutAlt  size={iconSize} />
        }
    ]

    if(userType === 'Vendedor'){

        menuItem = [
            ...dashboardItem,
            {
                path:'/fluxoCaixa',
                name:'Caixa',
                icon:<FaCashRegister size={iconSize} />
            },
            {
                path:'/transacao',
                name:'Transacao',
                icon:<FaShoppingCart size={iconSize} />
            },
            {
                path:'/devolucao',
                name:'Devolução',
                icon:<FaUndo size={iconSize} />
            },
            ...settingsItem,
            ...helpItem,
            ...logOutItem
        ]

    } else if(userType === 'Gerente'){

        menuItem = [
            ...dashboardItem,
            {
                path:'/venda',
                name:'Venda',
                icon:<FaChartLine size={iconSize} />
            },
            {
                path:'/movimento',
                name:'Fluxo Caixa',
                icon:<FaMoneyCheckAlt size={iconSize} />
            },
            {
                path:'/devolucao',
                name:'Devolução',
                icon:<FaUndo size={iconSize} />
            },
            {
                path:'/produto',
                name:'Produto',
                icon:<FaShoppingBag size={iconSize} />
            },
            {
                path:'/categoria',
                name:'Categoria',
                icon:<FaTag size={iconSize} />
            },
            {
                path:'/desconto',
                name:'Desconto',
                icon:<FaPercent size={iconSize} />
            },
            {
                path:'/caixa',
                name:'Caixa',
                icon:<FaCashRegister size={iconSize} />
            },
            {
                path:'/report',
                name:'Relatório',
                icon:<FaChartBar size={iconSize} />
            },
            {
                path:'/vendedor',
                name:'Vendedor',
                icon:<FaUserAlt  size={iconSize} />
            },
            {
                path:'/cliente',
                name:'Cliente',
                icon:<FaUserTie  size={iconSize} />
            },
            {
                path:'/fornecedor',
                name:'Fornecedor',
                icon:<FaTruck size={iconSize} />
            },
            ...settingsItem,
            ...helpItem,
            ...logOutItem
        ]
    }else if(userType === 'Admin'){
        menuItem = [
            ...dashboardItem,
            {
                path:'/utilizador',
                name:'Utilizador',
                icon:<FaUser size={iconSize} />
            },
            {
                path:'/metodoPagamento',
                name:'Gestão Pagamento',
                icon:<FaCreditCard size={iconSize} />
            },
            
            ...settingsItem,
            ...helpItem,
            ...logOutItem
        ]
    }else{
        menuItem = [
            {
                name:'Nothing to show'
            }
        ]
    }

  return (
    <div className='container'>
       
        <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
            <div className="top_section">
                <h1 style={{display: isOpen ? "block" : "none"}} className="logo">OneClick</h1>
                <div style={{marginLeft: isOpen ? "25px" : "0px"}} className="bars"><FaBars onClick={toggle} /></div>
            </div>

            {
                menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className='link' activeClassName = 'active'>
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        
        <main style={{marginLeft: isOpen ? "200px" : "50px", transition: "all 0.5s"}}>
            <Navbar />
            {children}
        </main>
    </div>
  )
}

export default Sidebar