import React, { useState } from 'react'
//import TableDevolucao from '../components/TableDevolucao'
import Table from '../components/Table'
import FormNewDevolucao from '../components/FormNewDevolucao'

const Devolucao = () => {


    const userType = 'Vendedor'

  const columns = [
      {
          name:'Venda',
          selector:(row)=>row.venda
      },
      {
          name:'Data',
          selector:(row)=>row.data
      },
      {
          name:'Metodo',
          selector:(row)=>row.metodo
      },
      {
          name:"Motivo",
          selector:(row) => row.motivo
      },
      {
        name:'Quantidade',
        selector:(row)=>row.quantidade
    },
    {
        name:'Produto',
        selector:(row)=>row.produto
    },
    {
        name:'Cliente',
        selector:(row)=>row.cliente
    },
    {
        name:"Utilizador",
        selector:(row) => row.utilizador
    }
  ]

  const getData = [
    {venda:5, data:'2023-12-27',  metodo:'Troca Produto', motivo:'Fora do prazo', quantidade: 1, produto:'Leite', cliente:'João Mário', utilizador:'Alfonso Ramos'},
    {venda:8, data:'2023-12-27',  metodo:'Em Dinheiro', motivo:'Fora do prazo', quantidade: 3, produto:'Iogurte', cliente:'Carla Silva', utilizador:'Oscar Mendes'},
    {venda:7, data:'2023-12-28',  metodo:'Troca Produto', motivo:'Aberto', quantidade: 1, produto:'Água 1.5L', cliente:'Maria Évora', utilizador:'Oscar Mendes'},
    {venda:6, data:'2023-12-29',  metodo:'Em Dinheiro', motivo:'Estragado', quantidade: 1, produto:'Leite', cliente:'José Alves', utilizador:'Alfonso Ramos'},
    {venda:10, data:'2023-12-30',  metodo:'Troca Produto', motivo:'Com defeito', quantidade: 2, produto:'Galinha', cliente:'Joana Lopes', utilizador:'Alfonso Ramos'}
  ]

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

  const currentPage = 'devolucao'
  
  return (
    <>
    <div className={`container-content ${isModalOpen ? 'show-modal' : ''}`}>
        <div className="container-title">
            <h3>Devolução</h3>
        </div>
        {userType === 'Gerente' ? (
        <div className="table-container">
        <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={openModal} />
        </div>
        ) : (
        <div className='dev-form'>
            <div className="dev-title">
                <h3>Registo Devolução</h3>
            </div>
            <form action="">
                <div className="cliente-info">
                    <h3>Informações Cliente</h3>
                    <div className="full-camp">
                        <label htmlFor="">Cliente</label>
                        <input type="text" placeholder='Nome Cliente'/>
                    </div>
                    <div className="middle-camp">
                        <div className="the-camp">
                            <label htmlFor="">NIF</label>
                            <input type="text" placeholder='Numero NIF' />
                        </div>
                        <div className="the-camp">
                            <label htmlFor="">EMAIL</label>
                            <input type="text" placeholder='Endereço Email'/>
                        </div>
                    </div>
                    <div className="middle-camp">
                        <div className="the-camp">
                            <label htmlFor="">Morada</label>
                            <input type="text" placeholder='Morada'/>
                        </div>
                        <div className="the-camp">
                            <label htmlFor="">Ilha</label>
                            <input type="text" placeholder='Ilha' />
                        </div>
                    </div>
                    <div className="middle-camp">
                        <div className="the-camp">
                            <label htmlFor="">Telefone</label>
                            <input type="text" placeholder='Numero Telefone'/>
                        </div>
                        <div className="the-camp">
                            <label htmlFor="">Telemovel</label>
                            <input type="text" placeholder='Numero Telemovel'/>
                        </div>
                    </div>
                </div>
                <div className="dev-info">
                    <h3>Devolução</h3>
                    <div className="full-camp">
                        <label htmlFor="">Produto</label>
                        <input type="text" placeholder='Nome Produto'/>
                    </div>
                    <div className="middle-camp">
                        <div className="the-camp">
                            <label htmlFor="">Numero Venda</label>
                            <input type="text" placeholder='Numero Venda'/>
                        </div>
                        <div className="the-camp">
                            <label htmlFor="">Quantidade</label>
                            <input type="text" placeholder='Quantidade'/>
                        </div>
                    </div>
                    <div className="middle-camp">
                        <div className="the-camp">
                            <label htmlFor="">Metodo</label>
                            <select name="" id="">
                                <option value="emDinheiro">Devolução Dinheiro</option>
                                <option value="trocaProduto">Troca Produto</option>
                            </select>
                        </div>
                        <div className="the-camp">
                            <label htmlFor="">Motivo</label>
                            <input type="text" placeholder='Motivo'/>
                        </div>
                    </div>
                </div>
                <button type='submit'>Confirmar</button>
            </form>
        </div>
        )}
    </div>

    {isModalOpen && (
        <div className="modal">
            <div className="modal-container">
                <span className="close-btn" onClick={closeModal}>X</span>
                <FormNewDevolucao />
            </div>
        </div>
    )}
  </>
  )
}

export default Devolucao