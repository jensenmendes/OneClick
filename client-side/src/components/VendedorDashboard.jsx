import React from 'react'
import { FaMoneyBill, FaChartLine, FaUndo } from 'react-icons/fa';
import Card from '../components/Card';

const VendedorDashboard = () => {
    const cardsData = [
        { nome: 'Venda', valor: 20, icon: FaChartLine },
        { nome: 'Devolução', valor: 10, icon: FaUndo },
        { nome: 'Receita', valor: 100000, icon: FaMoneyBill }
    ];

    return (
        <div className="container-content">
            <div className="container-title">
                <h3>Dashboard</h3>
            </div>

            <div className="card-container">
                {cardsData.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>

            
        </div>
    );
}

export default VendedorDashboard