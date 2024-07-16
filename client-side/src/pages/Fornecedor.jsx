import React, { useState } from 'react'
import Table from '../components/Table'
import FormNewFornecedor from '../components/FormNewFornecedor'
import {FaEdit, FaTrash} from 'react-icons/fa'

const Fornecedor = () => {
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
            name:'Nome',
            selector:(row)=>row.empresa
        },
        {
            name:'Endereço',
            selector:(row)=>row.endereco,
        },
        {
            name:'Email',
            selector:(row)=>row.email
        },
        {
            name:'Telemovel',
            selector:(row)=>row.telemovel
        },
        {
            name:'Telefone',
            selector:(row)=>row.telefone
        },
        {
            name:'Action',
            cell: (row) => (
                <div style={buttonStyle.tableActionsButton}>
                    <button style={{...buttonStyle.button, ...buttonStyle.editButton}} onClick={() => handleEdit(row)}>
                        <FaEdit />
                    </button>
                    <button style={{...buttonStyle.button, ...buttonStyle.deleteButton}} onClick={() => handleDelete(row)}>
                        <FaTrash />
                    </button>
                </div>
            )
        },
    ]
    
    const getData = [
        {empresa:'XPTO',endereco:'Portugal', email:'xpto@gmail.com', telemovel:'12344455', telefone:'22333444'},
        {empresa:'Fornne',endereco:'AGF, Praia, Santiago, Cabo Verde', email:'Fornne@gmail.com', telemovel:'9999999', telefone:'2333444'},
        {empresa:'Trindade',endereco:'Trindade, Santiago, Cabo Verde', email:'trindade@gmail.com', telemovel:'5667766', telefone:'2556655'},
        {empresa:'EMPA',endereco:'Salrei, Boa Vista, Cabo Verde', email:'empa@gmail.com', telemovel:'5994444', telefone:'2643322'},
        {empresa:'Emicela',endereco:'Salrei, Boa Vista, Cabo Verde', email:'emicela@gmail.com', telemovel:'5887766', telefone:'3445556'}

    ]
    
    const currentPage = 'fornecedor'
    
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
                <h3>Fornecedor</h3>
            </div>

            <div className="table-container">
            <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
            </div>

        </div>

        {isModalOpen && (
           <div className="modal">
                <div className="modal-container">
                    <div className="modal-header">
                        <h3>Novo Fornecedor</h3>
                        <span className="close-btn" onClick={closeModal}>X</span>
                    </div>
                    <FormNewFornecedor />
                </div>
            </div>
        )}
    </>
    )
}

export default Fornecedor