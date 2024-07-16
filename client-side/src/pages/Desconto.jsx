import React, { useState } from 'react'
import Table from '../components/Table'
import {FaEdit, FaTrash} from 'react-icons/fa'
import FormNewDesconto from '../components/FormNewDesconto'

const Desconto = () => {
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
            background:'rgb(63, 64, 142)',
            color:'white'
        },
        deleteButton:{
            background:'red',
            color:'white'
        }
    }

    const handleEdit = () => {}
    const handleDelete = () => {}


    const columns = [
        {
            name:'Descrição',
            selector:(row)=>row.descricao
        },
        {
            name:'Data Inicio',
            selector:(row)=>row.dataInicio
        },
        {
            name:'Data Fim',
            selector:(row)=>row.dataFim
        },
        {
            name:'Tipo',
            selector:(row)=>row.tipo
        },
        {
            name:'Metodo',
            selector:(row)=>row.metodo
        },
        {
            name:'Valor',
            selector:(row)=>row.valor
        },
        {
            name:'Action',
            width:'100px',
            cell: (row) => (
                <div style={buttonStyle.tableActionsButton}>
                    <button style={{...buttonStyle.button, ...buttonStyle.editButton}} onClick={() => handleEdit(row)}>
                        <FaEdit />
                    </button>
                    <button style={{...buttonStyle.button, ...buttonStyle.deleteButton}} onClick={() => handleDelete(row)}>
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ]

    const getData = [
        { descricao: 'Compra em valor até 100$', dataInicio: '2023-06-01', dataFim: '2023-08-31', tipo: 'Venda',metodo:'Monetário', valor: 15 },
        { descricao: 'Ano Novo', dataInicio: '2023-12-27', dataFim: '2023-12-31', tipo:'Produto', metodo:'Percentual', valor: 20 },
        { descricao: 'Natal 2023', dataInicio: '2023-12-22', dataFim: '2023-12-24', tipo:'Produto',metodo:'Percentual', valor: 10 },
        { descricao: 'Compra apartir de 500$', dataInicio: '2023-03-01', dataFim: '2023-05-31',tipo:'Venda', metodo:'Percentual', valor: 12 },
        { descricao: 'Desconto de Outono', dataInicio: '2023-09-01', dataFim: '2023-11-30', tipo:'Venda', metodo:'Percentual', valor: 18 },
      ];
    
    const currentPage = 'desconto'
    
    const fetchData = async () => {
        return getData;
        //return fetch("https://fakestoreapi.com/products");
    };

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <>
            <div className={`container-content ${isModalOpen ? 'show-modal' : ''}`}>
                <div className="container-title">
                    <h3>Desconto</h3>
                </div>
                
                <div className="table-container">
                <Table style={{width:'400px'}} columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
                </div>
        
            </div>

            {isModalOpen && (
            <div className="modal">
                <div className="modal-container">
                    <div className="modal-header">
                        <h3>Novo Desconto</h3>
                        <span className="close-btn" onClick={closeModal}>X</span>
                    </div>
                    <FormNewDesconto />
                </div>
            </div>
            )}
        </>
    )
}

export default Desconto