import React, { useState } from 'react'
/*import ListCategory from '../components/ListCategory'
import ListProducts from '../components/ListProducts'*/
/*import ProductOrder from '../components/ProductOrder'
import ListTransaction from '../components/ListTransaction'
*/
import FormNewProductSale from '../components/FormNewProductSale'
import FormPagamento from '../components/FormPagamento'
import FormNewCliente from '../components/FormNewCliente'
import TransacaoDetails from '../components/TransacaoDetails'
import TransacaoActions from '../components/TransacaoActions'

const Transacao = () => {

    /*const columns = [
        {
            name:"Id",
            selector:(row) => row.id
        },
        {
            name:"Title",
            selector:(row) => row.title
        },
        {
            name:"Category",
            selector:(row) => row.category
        },
        {
            name:"Price",
            selector:(row) => row.price
        }
    ]

    const [data, setData] = useState([])

    const getProduct = async() => {
        try {
            const req = await fetch("https://fakestoreapi.com/products")

        const res = await req.json()

        setData(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])*/


    const [isModalOpen, setIsModalOpen] = useState(false)

    const [modalType, setModalType] = useState(null);

    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        <>

        <div className={`transaction-container ${isModalOpen ? 'show-modal' : ''}`}>
            <TransacaoDetails />
            <TransacaoActions isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} openModal={openModal} />
        </div>
        
        {isModalOpen && (
            <div className="modal">
                <div className="modal-container">
                <div className="modal-header">
                  {modalType === 'Produto' && <h3>Adicionar Produto</h3>}
                  {modalType === 'Pagar' && <h3>Novo Pagamento</h3>}
                  {modalType === 'Cliente' && <h3>Novo Cliente</h3>}
                  <span className="close-btn" onClick={closeModal}>X</span>
                </div>
                     {modalType === 'Produto' && <FormNewProductSale />}
                    {modalType === 'Pagar' && <FormPagamento />}
                    {modalType === 'Cliente' && <FormNewCliente />}
                    </div>
            </div>
        )}
        </>
       
    )

    /*return(
        <>
        <div className={`transaction-container ${isModalOpen ? 'show-modal' : ''}`}>
            <div className="product-transaction">
                <ProductOrder />
            </div>
            <div className="list-transaction-action">
                <div className="list-transaction">
                    <ListTransaction />
                </div>
                <div className="action">
                    <button className='btn-fatura'>Fatura</button>
                    <button className='btn-fatura' onClick={() => openModal('Produto')}>Produto</button>
                    <button className='btn-cliente' onClick={() => openModal('Cliente')}>Cliente</button>
                    <button className='btn-cancelar'>Cancelar</button>
                    <button className='btn-pagar' onClick={() => openModal('Pagar')}>Pagar</button>
                </div>
            </div>

        </div>

        {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <span className="close-btn" onClick={closeModal}>X</span>
                     {modalType === 'Produto' && <FormNewProductSale />}
                    {modalType === 'Pagar' && <FormPagamento />}
                    {modalType === 'Cliente' && <FormNewCliente />}
                    </div>
            </div>
        )}
        
        </>
    )*/

   /* return(
        <div className="transaction-container">
            <div className="data-transaction">
                <ListCategory />
                <ListProducts />
            </div>
            <div className="list-transaction-action">
                <div className="list-transaction">
                    <ListTransaction />
                </div>
                <div className="action">
                    <button className='btn-fatura'>Fatura</button>
                    <button className='btn-cliente'>Cliente</button>
                    <button className='btn-cancelar'>Cancelar</button>
                    <button className='btn-pagar'>Pagar</button>
                </div>
            </div>
        </div>
    )*/

  /*return (
    <div className='transaction-container'>
        <div className="data-transaction">
            <h2>Adiciona o Produto a Venda</h2>
            <div className="form-data-transaction">
                <form action="">
                    <div className="transaction-input">
                        <select name="" id="" required>
                            <option value="Category1">Category1</option>
                            <option value="Category2">Category2</option>
                            <option value="Category3">Category3</option>
                        </select>
                    </div>
                    <div className="transaction-input">
                    <select name="" id="" required>
                            <option value="Produto1">Produto1</option>
                            <option value="Produto2">Produto2</option>
                            <option value="Produto3">Produto3</option>
                        </select>
                    </div>
                    <div className="transaction-input">
                        <input type="text" placeholder='quantidade' required />
                    </div>
                    <button type="submit">ADD</button>
                </form>
                <div className="transacation-product-total">
                    <h3>Total: </h3>
                    <p>200$00</p>
                </div>
            </div>

            <div className="table-transacation-details">
                <table>
                    <thead>
                    <tr>
                            {columns.map((column, columnIndex) => (
                                <th key={columnIndex}>{column.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, columnIndex) => (
                                    <td key={columnIndex}>{column.selector(row)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="details-transaction">
            <div className="total">
                <h3>Total: </h3>
                <p>17000$00</p>
            </div>
            <div className="desconto">
                <h3>Desconto: </h3>
                <p>200$00</p>
            </div>
            <div className="imposto">
                    <h3>Iva: </h3>
                    <p>0.15</p>
            </div>
            <div className="btn-class">
                <button className='btn-fatura'>Fatura</button>
                <button className='btn-cliente'>Cliente</button>
                <button className='btn-cancelar'>Cancelar</button>
                <button className='btn-pagar'>Pagar</button>
            </div>
        </div>
    </div>
  )*/
}

export default Transacao