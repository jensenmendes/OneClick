import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import { FaMoneyBill, FaShoppingBag, FaUser, FaChartLine, FaTruck } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import DashGraph from '../components/DashGraph';
import DashReceita from '../components/DashReceita';

const GerenteDashboard = () => {

    const columns = [
        {
            name:"Data",
            selector:(row) => row.data
        },
        {
            name:"Estado",
            selector:(row) => row.estado
        },
        {
            name:"Pagamento",
            selector:(row) => row.pagamento
        },
        {
            name:"Total",
            selector:(row) => row.total
        },
        {
            name:"Recebido",
            selector:(row) => row.recebido
        },
        {
            name:"Desconto",
            selector:(row) => row.desconto
        },
        {
            name:"Numero Fatura",
            selector:(row) => row.fatura
        }
    ]

    const [data, setData] = useState([])

    const fetchData = () => {
        setTimeout(() => {
          setData([
            { data: '2023-12-24 09:23:22', estado: 'Concluída', pagamento: 'Cartão', total: 150.00, recebido: 150.00,  desconto: 0.00, fatura: 'Sem Fatura' },
            { data: '2023-12-24 09:12:00', estado: 'Concluída', pagamento: 'Dinheiro', total: 200.00, recebido: 200.00, desconto: 10.00, fatura: 'Sem Fatura' },
            { data: '2023-12-24 08:53:31', estado: 'Por concluir', pagamento: '-', total: 5700.00, recebido: 0,  desconto: 0.00, fatura: '239022' },
            { data: '2023-12-24 08:47:10', estado: 'Concluída', pagamento: 'Dinheiro', total: 180.00, recebido: 200.00,  desconto: 10.00, fatura: 'Sem Fatura' },
            { data: '2023-12-24 08:39:15', estado: 'Concluída', pagamento: 'Cartão', total: 250.00, recebido: 250.00,  desconto: 0.00, fatura: 'Sem Fatura' },
          ]);
        }, 1000);
      };

    /*const getVendas = async() => {
        try {
            const req = await fetch("https://fakestoreapi.com/products")

        const res = await req.json()

        setData(res)
        } catch (error) {
            console.log(error)
        }
    }*/

    useEffect(() => {
        //getVendas()
        fetchData()
    }, [])

    const recentVendas = data.slice(0, 5);

    const cardsData = [
        { nome: 'Vendedor', valor: 3, icon: FaUser },
        { nome: 'Venda', valor: 80, icon: FaChartLine },
        { nome: 'Produto', valor: 87, icon: FaShoppingBag },
        { nome: 'Receita', valor: 200000, icon: FaMoneyBill },
        { nome: 'Despesa', valor: 130000, icon:  MdAttachMoney },
        { nome: 'Fornecedor', valor: 8, icon:  FaTruck }
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
            <div className="dash-section-1">
                <div className="dash-sub-section-1">
                    <div className="report">
                        <div className="details">
                            <h3>Total Venda</h3>
                            <span>Report</span>
                        </div>
                        <DashGraph />
                    </div>
                </div>
                <div className="dash-sub-section-1">
                    <div className="report">
                        <div className="details">
                            <h3>Receita</h3>
                            <span>Report</span>
                        </div>
                        <DashReceita />
                    </div>
                </div>
            </div>

            <div className="table-section">
                <div className="details">
                    <h3>Vendas Recentes</h3>
                    <span>Ver</span>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            {columns.map((column, columnIndex) => (
                                <th key={columnIndex}>{column.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {recentVendas.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, columnIndex) => (
                                    <td key={columnIndex}>{column.selector(row)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ); 
}

export default GerenteDashboard