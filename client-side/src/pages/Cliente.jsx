import React from 'react'
import Table from '../components/Table'
import {FaEdit, FaTrash} from 'react-icons/fa'

const Cliente = () => {
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
            selector:(row)=>row.nome
        },
        {
            name:'Zona',
            selector:(row)=>row.zona
        },
        {
            name:'Cidade',
            selector:(row)=>row.cidade
        },
        {
            name:'Ilha',
            selector:(row)=>row.ilha
        },
        {
            name:'Nif',
            selector:(row)=>row.nif
        },
        {
            name:'Email',
            selector:(row)=>row.email
        },
        {
            name:'Telefone',
            selector:(row)=>row.telefone
        },
        {
            name:'Telemovel',
            selector:(row)=>row.telemovel
        },
        {
            name:'Pontos',
            selector:(row)=>row.ponto
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
    
    const currentPage = 'cliente'

    /*const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };*/

  

    const getData = [
        {nome:'João Silva',zona:'Palmarejo',cidade:'Praia',ilha:'Santiago',nif:'123443322',email:'joaosilva@exemplo.com',telefone:'2344444',telemovel:'5667777',ponto:'12'},
        {nome:'Carlos Lopes',zona:'Terra Branca',cidade:'Praia',ilha:'Santiago',nif:'77753322',email:'carloslopes@exemplo.com',telefone:'2399999',telemovel:'9349999',ponto:'8'},
        {nome:'Maria Braga',zona:'Safende',cidade:'Praia',ilha:'Santiago',nif:'13422334',email:'mariabraga@exemplo.com',telefone:'2225555',telemovel:'9999999',ponto:'17'},
        {nome:'Carla Lopes',zona:'Palmarejo',cidade:'Praia',ilha:'Santiago',nif:'32244455',email:'carlalopes@exemplo.com',telefone:'2315566',telemovel:'9342211',ponto:'10'},
    ]

    //const jsonData = JSON.stringify(getData);

    const fetchData = async () => {
        return getData;
        //return jsonData()
        //return fetch("https://fakestoreapi.com/products");
    };
    
    return (
        <>
        <div className='container-content'>
            <div className="container-title">
                <h3>Cliente</h3>
            </div>

            <div className="table-container">
                <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={null} />
            </div>

        </div>

        
    </>
    )
}

export default Cliente