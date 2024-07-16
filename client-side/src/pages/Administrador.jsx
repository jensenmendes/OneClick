import React, { useState } from 'react'
import Table from '../components/Table'
import FormNewAdmin from '../components/FormNewAdmin'

const Administrador = () => {
    const columns = [
        {
            name:'id',
            selector:(row)=>row.id
        },
        {
            name:'title',
            selector:(row)=>row.title
        },
        {
            name:'category',
            selector:(row)=>row.category
        },
        {
            name:"Price",
            selector:(row) => row.price
        }
    ]
    
    const currentPage = 'adminPage'

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const fetchData = async () => {
        return fetch("https://fakestoreapi.com/products");
    };
    
    return (
        <>
        <div className={`container-content ${isModalOpen ? 'show-modal' : ''}`}>
            <div className="container-title">
                <h3>Administrador</h3>
            </div>

            <div className="table-container">
            <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
            </div>

        </div>

        {isModalOpen && (
            <div className="modal">
                <div className="modal-container">
                    <span className="close-btn" onClick={closeModal}>X</span>
                    <FormNewAdmin />
                </div>
            </div>
        )}
    </>
    )
}

export default Administrador