import React, { useEffect, useState, useCallback } from 'react'
import DataTable from 'react-data-table-component'
//import { Link } from 'react-router-dom';

const Table= ({ columns, fetchData, currentPage, openModal }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
  
    // get dados

    const getDados = useCallback(async () => {
      try {
        const fetchedData = await fetchData();
        console.log("Dados recebidos:", fetchedData);
        setData(fetchedData); 
        setFilter(fetchedData);
      } catch (error) {
        console.log(error);
      }
    }, [fetchData]);
    

    /*const getDados = useCallback(async () => {
        try {
          const req = await fetchData();
          const res = await req.json();

          console.log('Dados recebidos:', res);
    
          setData(res); 
          setFilter(res);
        } catch (error) {
          console.log(error);
        }
    }, [fetchData]);*/
  
    // listar dados
    useEffect(() => {
      getDados();
    }, [getDados]);
  
    // pesquisar dados
   /*useEffect(() => {
    let result
    if(currentPage === 'utilizador'){
      result = data.filter((item) => {
        return item.primeiroNome.toLowerCase().match(search.toLocaleLowerCase());
      });
    }

    if(currentPage === 'fornecedor'){
      result = data.filter((item) => {
        return item.empresa.toLowerCase().match(search.toLocaleLowerCase());
      });
    }

    if(currentPage === 'venda'){
      result = data.filter((item) => {
        return item.data.toLowerCase().match(search.toLocaleLowerCase());
      });
    }
      
  
      setFilter(result);
    }, [currentPage, search, data]);*/

    
  
    // estilização
    const tableStyle = {

      table:{
        borderRadius:'10px',
      },

      subHeader: {
        style: {
          marginTop: '0px',
          padding: '0px', 
          background:'none'
        },
      },


      headCells: {
        style: {
          fontWeight: 'bold',
          fontSize: '12px',
          color: 'black',
          '&:first-child': {
            borderTopLeftRadius: '10px',  
            borderBottomLeftRadius: '10px', 
          },
          '&:last-child': {
            borderTopRightRadius: '10px', 
            borderBottomRightRadius: '10px', 
          },
        },
      },
      rows: {
        style: {
          backgroundColor: '#FFFFFF',
          borderRadius:'10px',
          marginTop:'10px',
          fontSize: '12px',
          paddingTop: '5PX',
        },
      },
    };


    return (
      <DataTable
        className='dt-table'
        customStyles={tableStyle}
        columns={columns}
        data={filter}
        fixedHeaderScrollHeight='370px'
        noHeader
        pagination
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderAlign="left"
        subHeaderComponent={(() => {
          if (currentPage === 'venda') {
            return (
              <div className='table-header'>
                
                <form action="">
                  <div className="campo">
                    <label htmlFor="">De:</label>
                    <input type="date" placeholder='Data de Inicio' />
                  </div>
                  <div className="campo">
                    <label htmlFor="">Até:</label>
                    <input type="date" placeholder='Data de Fim' />
                  </div>
                  <select name="" id="">
                    <option value="" selected>Estado</option>
                    <option value="">Concluída</option>
                  </select>
                  <select name="" id="">
                    <option value="" selected>Pagamento</option>
                    <option value="">Cartão</option>
                  </select>
                  <button>Filtrar</button>
                </form>
                <div className="btn-action">
                <button className="importar">Importar</button>
                  <button className="excel">Excel</button>
                </div>
              </div>
            );
          } else if (currentPage === 'devolucao') {
            return (
              <div className='table-header'>
                
                <form action="">
                  <div className="campo">
                    <label htmlFor="">De:</label>
                    <input type="date" placeholder='Data de Inicio' />
                  </div>
                  <div className="campo">
                    <label htmlFor="">Até:</label>
                    <input type="date" placeholder='Data de Fim' />
                  </div>
                  <select name="" id="">
                    <option value="" selected>Metodo</option>
                    <option value="">Troca Produto</option>
                  </select>
                  <button>Filtrar</button>
                </form>
                <div className="btn-action">
                <button className="importar">Importar</button>
                  <button className="excel">Excel</button>
                </div>
              </div>
            );
          }else if (currentPage === 'cliente') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            );
          }else if (currentPage === 'transacao') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Pesquisar por nº Venda" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            );
          }else if (currentPage === 'movimento') {
            return (
              <div className='table-header'>
                <form action="">
                  <div className="campo">
                    <label htmlFor="">De:</label>
                    <input type="date" placeholder='Data de Inicio' />
                  </div>
                  <div className="campo">
                    <label htmlFor="">Até:</label>
                    <input type="date" placeholder='Data de Fim' />
                  </div>
                  <select name="" id="">
                    <option value="" selected>Caixa</option>
                    <option value="">Caixa 01</option>
                  </select>
                <input type="search" name="" id="" placeholder="Pesquisar utilizador..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <button>Filtrar</button>
                </form>

                
              </div>
            );
          }else if (currentPage === 'produto') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Pesquisar por Produto, Categoria,..." value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="btn-action">
                  <button className="importar" onClick={openModal}>Importar</button>
                  <button className="new" onClick={openModal}>New</button>
                </div>
              </div>
            );
          } else if (currentPage === 'metodoPagamento') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Pesquisar por metodo" value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="btn-action">
                  <button className="new" onClick={openModal}>New</button>
                </div>
              </div>
            );
          }else if (currentPage === 'fornecedor') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="btn-action">
                  <button className="new" onClick={openModal}>New</button>
                </div>
              </div>
            );
          } else if (currentPage === 'caixa') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="btn-action">
                  <button className="new" onClick={openModal}>New</button>
                </div>
              </div>
            );
          } else if (currentPage === 'utilizador') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="btn-action">
                  <button className="new" onClick={openModal}>New</button>
                </div>
              </div>
            );
          } else if (currentPage === 'vendedor') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />

              </div>
            );
          } else if (currentPage === 'categoria') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="btn-action">
                  <button className="new" onClick={openModal}>New</button>
                </div>
              </div>
            );
          }else if (currentPage === 'desconto') {
            return (
              <div className='table-header'>
                <input type="search" name="" id="" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="btn-action">
                  <button className="new" onClick={openModal}>New</button>
                </div>
              </div>
            );
          }

          return null; // Default case or return an empty fragment
        })()}
      />
    );
  };
  
export default Table