import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const TableVenda = () => {

    
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

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])

    //get dados
    const getDados = async() => {
        try {
            const req = await fetch("https://fakestoreapi.com/products")
            const res = await req.json()

            setData(res)
            setFilter(res)
        } catch (error) {
            console.log(error)
        }
    }

    //listar dados
    useEffect(() => {
        getDados()
    }, [])

    //pesquisar dados
    useEffect(() => {
        const result = data.filter((item) => {
            return item.title.toLowerCase().match(search.toLocaleLowerCase())
        })

        setFilter(result)
    }, [search, data])

    //estilização
    const tableStyle = {
        table:{
            style:{
                marginLeft:"20px",
                marginRight:"20px"
            }
        },
        headCells:{
            style:{
                fontWeight:"bold",
                fontSize:"14px",
                background:"blue",
                color:"white"
            }
        },

        rows: {
            style: {
              backgroundColor: '#FFFFFF',
              '&:nth-child(2n)': {
                backgroundColor: '#EEEEEE',
              },
            },
        }
        
    }


  return (
    
        <DataTable
            className='dt-table'
            customStyles={tableStyle}
            columns={columns}
            data={filter}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            actions={
                <button className="table-btn btn-pdf">Export PDF</button>
            }
            subHeader
            subHeaderComponent = {
                <div className="search-btn-component">
                    <input type="search" name="search" id="search" className='table-search'
                    placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />

                    <a href='/transacao' className='table-btn btn-new'>New</a>
                </div>
            }
            subHeaderAlign="left"

            />
    
  )
}

export default TableVenda