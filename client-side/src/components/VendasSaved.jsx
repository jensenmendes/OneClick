import React from 'react'
import { FaTrash} from 'react-icons/fa'
import Table from '../components/Table'

const VendasSaved = () => {

    const buttonStyle = {
        tableActionsButton:{
            display: 'flex',
            justifyContent:'start',
            alignItems:'center',
            width: '100%',
            gap:'5px'
        },
        button:{
            border:'none',
            outline:'none',
            cursor:'pointer',
            borderRadius: '20px',
            fontWeight:'bold',
            background:'none'
        },
        payButton:{
            color:'blue'
        },
        deleteButton:{
            color:'red'
        }
    }

    //const handleEdit = () => {}
    const handleDelete = () => {}


    const vendaSaved = [
        {
          data:'2023-12-24', nVenda:4, total:195.00
        },
        {
            data:'2023-12-24', nVenda:8, total:195.00
        },
        {
            data:'2023-12-24', nVenda:12, total:195.00
        },
        {
            data:'2023-12-24', nVenda:13, total:195.00
        },
        
          
      ]

     /* const fetchData = async () => {
        return vendaSaved;
        //return jsonData()
        //return fetch("https://fakestoreapi.com/products");
    };

      return (
        <div className='tbl-vendas-Saved'>
            <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={null} />
        </div>
      )*/
      
  return (
    <div className='tbl-vendas-Saved'>
        <div className="tbl-row tbl-header">
            <span>Data</span>
            <span>Venda</span>
            <span>Total</span>
            <span>Action</span>
        </div>
            {
                vendaSaved.map((venda, index) => (
                    <div key={index} className="tbl-row tbl-body">
                        <span>{venda.data}</span>
                        <span>{venda.nVenda}</span>
                        <span>{venda.total}</span>
                        <div style={buttonStyle.tableActionsButton}>
                            <button style={{...buttonStyle.button, ...buttonStyle.payButton}} onClick={handleDelete}>
                                Pagar
                            </button>
                            <button style={{...buttonStyle.button, ...buttonStyle.deleteButton}} onClick={handleDelete}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))
            }
        
    </div>
  )
}

export default VendasSaved