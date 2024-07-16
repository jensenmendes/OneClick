import React, { useState } from 'react'
import Table from '../components/Table'
import FormNewLoja from '../components/FormNewLoja'

const Loja = () => {
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
    
    const currentPage = 'loja'
    
    const fetchData = async () => {
        return fetch("https://fakestoreapi.com/products");
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
                <h3>Loja</h3>
            </div>

            <div className="table-container">
            <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
            </div>

        </div>

        {isModalOpen && (
            <div className="modal">
                <div className="modal-container">
                    <span className="close-btn" onClick={closeModal}>X</span>
                    <FormNewLoja />
                </div>
            </div>
        )}
    </>
    )
}

export default Loja