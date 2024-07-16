import React, { useState } from 'react'
import Table from '../components/Table'
import FormNewUser from '../components/FormNewUser'
import {FaEdit, FaTrash} from 'react-icons/fa'
import JensenImg from '../assets/img/jensen.jpg'
import DefaultImg from '../assets/img/usericon.png'
import AlfonsoImg from '../assets/img/alfonso.jpg'

const Utilizador = ({userType}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

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
            name:'Imagem',
            cell: (row) => <img src={row.imagem} alt="User" style={{ width: '50px', borderRadius: '50%', padding:'10px' }} />,
        },
        {
            name:'Primeiro Nome',
            selector:(row)=>row.primeiroNome
        },
        {
            name:'Ultimo Nome',
            selector:(row)=>row.ultimoNome
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
            name:'Funcao',
            selector:(row)=>row.funcao
        },
        {
            name:'Estado',
            selector:(row)=>row.estado
        },
       
    ]

    if (userType === 'Gerente') {
        columns.push(
            {
                name: 'Venda',
                selector: (row) => row.venda
            },
            {
                name: 'Devolução',
                selector: (row) => row.devolucao
            },
            
        );
    }

   
        columns.push(
           
            {
                name: 'Action',
                cell: (row) => (
                    <div style={buttonStyle.tableActionsButton}>
                        <button style={{ ...buttonStyle.button, ...buttonStyle.editButton }} onClick={() => handleEdit(row)}>
                            <FaEdit />
                        </button>
                        <button style={{ ...buttonStyle.button, ...buttonStyle.deleteButton }} onClick={() => handleDelete(row)}>
                            <FaTrash />
                        </button>
                    </div>
                )
            }
        );
  
    
    let currentPage = ''

    if (userType === 'Admin'){
        currentPage = 'utilizador'
    } else if (userType === 'Gerente'){
        currentPage = 'vendedor'
    } else return null
    

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

  
    let getData = []

    if(userType === 'Admin'){
         getData = [
            {imagem:JensenImg,primeiroNome:'Jensen',ultimoNome:'Mendes',email:'jensen08david@gmail.com', telemovel:'9889999', estado:'Ativo',funcao:'Administrador'},
            {imagem:DefaultImg,primeiroNome:'Albertina',ultimoNome:'Mendes',email:'albetina10mendes@gmail.com', telemovel:'9543344', estado:'Ativo',funcao:'Gerente'},
            {imagem:DefaultImg,primeiroNome:'Ismael',ultimoNome:'Evora',email:'ismaevora@hotmail.com', telemovel:'5669966', estado:'Suspenso',funcao:'Vendedor'},
            {imagem:AlfonsoImg,primeiroNome:'Alfonso',ultimoNome:'Ramos',email:'dyseghostcvsal@gmail.com', telemovel:'9999988', estado:'Desativo',funcao:'Vendedor'},
            {imagem:DefaultImg,primeiroNome:'Oscar',ultimoNome:'Mendes',email:'oscarmendes@gmail.com', telemovel:'5998899', estado:'Ativo',funcao:'Vendedor'}

        ]
    } else if (userType === 'Gerente'){
        getData = [
           {imagem:DefaultImg,primeiroNome:'Ismael',ultimoNome:'Evora',email:'ismaevora@hotmail.com',estado:'Suspenso', telemovel:'5669966',funcao:'Vendedor', venda:12, devolucao:2},
           {imagem:AlfonsoImg,primeiroNome:'Alfonso',ultimoNome:'Ramos',email:'dyseghostcvsal@gmail.com',estado:'Desativo', telemovel:'9999988',funcao:'Vendedor', venda:17, devolucao:4},
           {imagem:DefaultImg,primeiroNome:'Oscar',ultimoNome:'Mendes',email:'oscarmendes@gmail.com',estado:'Ativo', telemovel:'5998899',funcao:'Vendedor', venda:13, devolucao:3}

       ]
   } else return null
    //const jsonData = JSON.stringify(getData);
    
    //titulo da pagina consoante utilizador
    const pageTitle = () => {
        if(userType === 'Admin'){
            return <h3>Utilizador</h3>;
        } else if (userType === 'Gerente') {
          return <h3>Vendedor</h3>;
        }
        return null;
    }

    const fetchData = () => {
        if(userType === 'Admin'){
            return getData;
        } else if (userType === 'Gerente') {
            return getData.filter((user) => user.funcao === 'Vendedor');
        }
        return [];
    }

    /*const fetchData = async () => {
        return getData;
        //return jsonData()
        //return fetch("https://fakestoreapi.com/products");
    };*/
    
    return (
        <>
        <div className={`container-content ${isModalOpen ? 'show-modal' : ''}`}>
            <div className="container-title">
                {pageTitle()}
            </div>

            <div className="table-container">
                <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
            </div>

        </div>

        {isModalOpen && (
            <div className="modal">
                <div className="modal-container">
                    <div className="modal-header">
                        <h3>Novo Utilizador</h3>
                        <span className="close-btn" onClick={closeModal}>X</span>
                    </div>
                    <FormNewUser />
                </div>
            </div>
        )}
    </>
    )
}

export default Utilizador