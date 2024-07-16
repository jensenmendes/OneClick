import React from 'react'
import Table from '../components/Table'

const FluxoCaixa = () => {
   

    const columns = [
        {
            name:'Entrada',
            selector:(row)=>row.entrada
        },
        {
            name:'Saída',
            selector:(row)=>row.saida
        },
        {
            name:'Saldo Inicial',
            selector:(row)=>row.saldoInicial
        },
        {
            name:'Saldo Final',
            selector:(row)=>row.saldoFinal
        },
        {
            name:'Utilizador',
            selector:(row)=>row.utilizador
        },
        {
            name:'Caixa',
            selector:(row)=>row.caixa
        },
    ]
    
    const currentPage = 'movimento'

    /*const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };*/

  

    const getData = [
        {entrada:'2023-12-22 08:00:00',saida:'2023-12-22 18:00:00',saldoInicial:'200.00',saldoFinal:'15000.00',utilizador:'Alfonso Ramos',caixa:'PDV 01'},
        {entrada:'2023-12-22 08:00:00',saida:'2023-12-22 12:00:00',saldoInicial:'500.00',saldoFinal:'10000.00',utilizador:'Oscar Mendes',caixa:'PDV 02'},
        {entrada:'2023-12-23 08:00:00',saida:'2023-12-23 12:00:00',saldoInicial:'1000.00',saldoFinal:'12000.00',utilizador:'Alfonso Ramos',caixa:'PDV 01'},
        {entrada:'2023-12-23 08:00:00',saida:'2023-12-23 18:00:00',saldoInicial:'750.00',saldoFinal:'20000.00',utilizador:'Oscar Mendes',caixa:'PDV 02'},
        
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
                <h3>Fluxo Caixa</h3>
            </div>

            <div className="table-container">
                <Table columns={columns} fetchData={fetchData} currentPage={currentPage} openModal={null} />
            </div>

        </div>

        
    </>
    )
}

export default FluxoCaixa