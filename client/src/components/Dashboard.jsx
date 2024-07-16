import React from 'react'
import { useState } from 'react'

//CSS
import './assets/css/Dashboard.css'

//PAGINAS
import Home from './Home'
import Sidebar from './Sidebar'
import Header from './Header'

export const Dashboard = () => {
    const [count, setCount] = useState(0);
  return (
    <div className="grid-container">
        <Header />
        <Sidebar />
        <Home />
    </div>
  )
}

export default Dashboard
