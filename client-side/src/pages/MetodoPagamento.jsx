import React, { useState } from 'react'
import Table from '../components/Table'
import FormNewMetodoPagam from '../components/FormNewMetodoPagam'
import {FaTrash} from 'react-icons/fa'

const MetodoPagamento = () => {
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
        deleteButton:{
            background:'red',
            color:'white'
        }
    }

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
            name:'Metodo',
            selector:(row)=>row.nome
        },
        {
            name:'Action',
            width:'100px',
            cell: (row) => (
                <div style={buttonStyle.tableActionsButton}>
                    <button style={{...buttonStyle.button, ...buttonStyle.deleteButton}} onClick={() => handleDelete(row)}>
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ]

    const getData = [
        {id:1, nome:'Dinheiro' },
        {id:2, nome:'Cartão' },
    ]
    
    const currentPage = 'metodoPagamento'
    
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
                    <h3>Método Pagamento</h3>
                </div>
                
                <div className="table-container" style={{width:'450px'}}>
                <Table style={{width:'400px'}} columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
                </div>
        
            </div>

            {isModalOpen && (
            <div className="modal">
                <div className="modal-container">
                    <div className="modal-header">
                        <h3>Novo Método de Pagamento</h3>
                        <span className="close-btn" onClick={closeModal}>X</span>
                    </div>
                    <FormNewMetodoPagam />
                </div>
            </div>
            )}
        </>
    )
}

export default MetodoPagamento