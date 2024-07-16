import React, { useState } from 'react'
import Table from '../components/Table'
import FormNewCategoria from '../components/FormNewCategoria'
import {FaEdit, FaTrash} from 'react-icons/fa'

const Categoria = () => {

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
            name: 'Id',
            selector: (row) => row.id,
            sortable: true,
            width: '60px', 
            cell: (row) => (
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {row.id}
              </div>
            ),
            style: {
              maxWidth: '60px', 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
        },
        {
            name:'Categoria',
            selector:(row)=>row.nome
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
        {id:1, nome:'Bebidas Alcolicas' },
        {id:2, nome:'Lacticinio' },
        {id:3, nome:'Refrigerante' },
        {id:4, nome:'Água' },
        {id:5, nome:'Bebidas Energiticos' },
        {id:6, nome:'Snacks' },
    ]
    
    const currentPage = 'categoria'
    
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
                    <h3>Categoria</h3>
                </div>
                
                <div className="table-container" style={{width:'450px'}}>
                <Table style={{width:'400px'}} columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
                </div>
        
            </div>

            {isModalOpen && (
            <div className="modal">
                <div className="modal-container">
                    <div className="modal-header">
                        <h3>Novo Categoria</h3>
                        <span className="close-btn" onClick={closeModal}>X</span>
                    </div>
                    <FormNewCategoria />
                </div>
            </div>
            )}
        </>
    )
}

export default Categoria