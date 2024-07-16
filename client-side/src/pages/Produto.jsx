import React, { useState } from 'react'
import Table from '../components/Table'
import FormNewProduto from '../components/FormularioNewProduto'
import {FaEdit, FaTrash, FaPercentage} from 'react-icons/fa'
import aguaUmImg from '../assets/img/agua1_5l.jpg'
import aguaTresImg from '../assets/img/agua5l.jpeg'
import aguaDoisImg from '../assets/img/trindade050.png'
import incolac from '../assets/img/incolac.png'
import cocalcola from '../assets/img/cocacola.jpeg'
import bolacha from '../assets/img/bolacha.jpg'
import iogurte from '../assets/img/iogurte.jpeg'
import presunto from '../assets/img/presunto.jpeg'
import goodies from '../assets/img/goodies.png'
import mancara from '../assets/img/mancarrinhas.jpeg'

const Produto = () => {

    const buttonStyle = {
        tableActionsButton:{
            display: 'flex',
            justifyContent:'start',
            alignItems:'center',
            width: '100%',
            gap:'5px'
        },
        button:{
            padding:'5px',
            border:'none',
            outline:'none',
            cursor:'pointer',
            borderRadius: '20px',
            fontWeight:'bold'
        },
        descontButton:{
            background:'blue',
            color:'white'
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
            name:'Imagem',
            cell: (row) => <img src={row.imagem} alt="User" style={{ width: '50px', borderRadius: '50%', padding:'10px' }} />,
        },
        {
            name:'Nome',
            selector:(row)=>row.nome
        },
        {
            name:'Quantidade',
            selector:(row)=>row.quantidade
        },
        {
            name:'Preço',
            selector:(row)=>row.preco
        },
        {
            name:'Custo',
            selector:(row)=>row.custo
        },
        {
            name:'desconto',
            selector:(row)=>row.desconto
        },
        {
            name:'Estado',
            selector:(row)=>row.estado
        },
        {
            name:'Categoria',
            selector:(row)=>row.categoria
        },
        {
            name:'Fornecedor',
            selector:(row)=>row.fornecedor
        },
        {
            name:'Action',
            cell: (row) => (
                <div style={buttonStyle.tableActionsButton}>
                    <button style={{...buttonStyle.button, ...buttonStyle.descontButton}} onClick={() => handleEdit(row)}>
                        <FaPercentage />
                    </button>
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
        {imagem:aguaUmImg, nome:'Agua Trindade 1.5L', quantidade:220,preco:75.00,custo:60.00,desconto:0.00, estado:'Ativo',categoria:'Agua', fornecedor:'Trindade'},
        {imagem:aguaTresImg, nome:'Agua Trindade 5L',quantidade:300,preco:150.00,custo:120.00,desconto:0.10, estado:'Ativo',categoria:'Agua', fornecedor:'Trindade'},
        {imagem:aguaDoisImg, nome:'Agua Trindade 0.5L',quantidade:250,preco:50.00,custo:40.00,desconto:0.00, estado:'Ativo',categoria:'Agua', fornecedor:'Trindade'},
        {imagem:iogurte, nome:'Iogurte Iogurel P',quantidade:150,preco:95.00,custo:75.00,desconto:0.05, estado:'Ativo',categoria:'Lacticinio', fornecedor:'Iogurel'},
        {imagem:bolacha, nome:'Bolacha Maria',quantidade:250,preco:65.00,custo:50.00,desconto:0.00, estado:'Ativo',categoria:'Snacks', fornecedor:'Adega'},
        {imagem:incolac, nome:'Leite Incolac',quantidade:450,preco:145.00,custo:135.00,desconto:0.00, estado:'Ativo',categoria:'Lacticinio', fornecedor:'Incolac'},
        {imagem:goodies,nome:'Goodies',quantidade:150,preco:195.00,custo:180.00,desconto:0.15, estado:'Ativo',categoria:'Snacks', fornecedor:'Adega'},
        {imagem:presunto, nome:'Matutano Presunto',quantidade:200,preco:150.00,custo:135.00,desconto:0.00, estado:'Ativo',categoria:'Snacks', fornecedor:'Adega'},
        {imagem:mancara,nome:'Mancara',quantidade:170,preco:120.00,custo:110.00,desconto:0.00, estado:'Ativo',categoria:'Snacks', fornecedor:'Adega'},
        {imagem:cocalcola,nome:'Coca-Cola',quantidade:230,preco:100.00,custo:85.00,desconto:0.10, estado:'Ativo',categoria:'Refrigerante', fornecedor:'Adega'},

    ]

  const fetchData = async () => {
    return getData;
    //return fetch("https://fakestoreapi.com/products");
  };

  const currentPage = 'produto'

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
            <h3>Produto</h3>
        </div>

        <div className="table-container">
        <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
        </div>

    </div>

    {isModalOpen && (
        <div className="modal">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Novo Produto</h3>
                    <span className="close-btn" onClick={closeModal}>X</span>
                </div>
                <FormNewProduto />
            </div>
        </div>
    )}
  </>
  )
}

export default Produto