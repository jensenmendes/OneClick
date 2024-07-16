import React, { useState } from 'react'
//import TableVenda from '../components/TableVenda'
import Table from '../components/Table'
import {FaEdit, FaEye} from 'react-icons/fa'

const Vendas = () => {

  const buttonStyle = {
        tableActionsButton:{
            display: 'flex',
            justifyContent:'start',
            alignItems:'center',
            width: '100%',
            gap:'5px'
        },
        button:{
            padding:'10px',
            border:'none',
            outline:'none',
            cursor:'pointer',
            borderRadius: '20px',
            fontWeight:'bold'
        },
        editButton:{
            background:'yellow',
            color:'white'
        },
        detailsButton:{
          background:'green',
          color:'white'
        },
      
    }

  const handleEdit = () => {}

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
          name:"Fatura",
          selector:(row) => row.fatura
      },
      {
        name:"Cliente",
        selector:(row) => row.cliente
      },
      {
        name:"Utilizador",
        selector:(row) => row.utilizador
      },
      {
        name:'Action',
        cell: (row) => (
            <div style={buttonStyle.tableActionsButton}>
                <button style={{...buttonStyle.button, ...buttonStyle.detailsButton}} onClick={() => handleEdit(row)}>
                    <FaEye />
                </button>
            </div>
        )
      },
  ]

  const currentPage = 'venda'

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => { 
    setIsModalOpen(true)
}

    const getData = [
      { data: '2023-12-24 09:23:22', estado: 'Concluída', pagamento: 'Cartão', total: '150.00', recebido: '150.00',  desconto: '0.00', fatura: 'Sem Fatura', cliente:'N/A', utilizador:'Oscar Mendes' },
      { data: '2023-12-24 09:12:00', estado: 'Concluída', pagamento: 'Dinheiro', total: '200.00', recebido: '200.00', desconto: '0.15', fatura: 'Sem Fatura', cliente:'João Silva', utilizador:'Oscar Mendes' },
      { data: '2023-12-24 08:53:31', estado: 'Em Aberto', pagamento: '-', total: '5700.00', recebido: '0',  desconto: '0.00', fatura: 'Sem Fatura', cliente:'Carlos Lopes', utilizador:'Oscar Mendes' },
      { data: '2023-12-24 08:47:10', estado: 'Concluída', pagamento: 'Dinheiro', total: '180.00', recebido: '200.00',  desconto: '0.10', fatura: 'Sem Fatura', cliente:'N/A', utilizador:'Oscar Mendes' },
      { data: '2023-12-24 08:39:15', estado: 'Concluída', pagamento: 'Cartão', total: '250.00', recebido: '250.00',  desconto: '0.00', fatura: 'Sem Fatura', cliente:'N/A', utilizador:'Oscar Mendes' },
      { data: '2023-12-23 13:05:45', estado: 'Pendente', pagamento: '2023-12-27', total: '120.00', recebido: '0',  desconto: '0.05', fatura: '239023', cliente:'Maria Braga', utilizador:'Alfonso Tavares' },
      { data: '2023-12-23 12:21:30', estado: 'Concluída', pagamento: 'Cartão', total: '300.00', recebido: '300.00',  desconto: '0.15', fatura: 'Sem Fatura', cliente:'N/A', utilizador:'Alfonso Tavares' },
      { data: '2023-12-23 11:36:12', estado: 'Pendente', pagamento: 'Dinheiro', total: '450.00', recebido: 450.00,  desconto: '0.00', fatura: '239024', cliente:'Carla Lopes', utilizador:'Alfonso Tavares' },
      { data: '2023-12-23 10:52:00', estado: 'Concluída', pagamento: 'Dinheiro', total: '350.00', recebido: '400.00',  desconto: '0.08', fatura: 'Sem Fatura', cliente:'N/A', utilizador:'Ismael Évora' },
      { data: '2023-12-23 10:07:20', estado: 'Concluída', pagamento: 'Cartão', total: '500.00', recebido: '500.00',  desconto: '0.05', fatura: 'Sem Fatura', cliente:'N/A', utilizador:'Ismael Évora' }
    ]
        
  const fetchData = async () => {
    return getData;
    //return fetch("https://fakestoreapi.com/products");
  };

  return (
    <div className='container-content'>
        <div className="container-title">
            <h3>Vendas</h3>
        </div>
        
        <div className="table-container">
          <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
        </div>

    </div>
  )
}

export default Vendas