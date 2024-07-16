import React from 'react'
//import TablePagamento from '../components/TablePagamento'
import Table from '../components/Table'

const Pagamento = () => {
  
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

  const fetchData = async () => {
    return fetch("https://fakestoreapi.com/products");
  }; 


  return (
    <div className='container-content'>
      <div className="container-title">
        <h3>Pagamento</h3>
      </div>

      <div className="table-container">
        <Table columns={columns} fetchData={fetchData} />
      </div>
    </div>
  )
}

export default Pagamento