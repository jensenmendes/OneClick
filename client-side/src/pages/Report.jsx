import React, { useState } from 'react'
//import Card from '../components/Card';
//import { FaMoneyBill, FaShoppingBag, FaUndo } from 'react-icons/fa';
//import DashGraph from '../components/DashGraph';
import ListReport from '../components/ListReport';
import ReportVendas from '../components/ReportVendas';
import ReportProduto from '../components/ReportProduto';
import ReportCategoria from '../components/ReportCategoria';
import ReportReceita from '../components/ReportReceita';

const Report = () => {

    //valores CARD
    /*const cardsData = [
        { nome: 'Total Devolução', valor: 20, icon: FaUndo },
        { nome: 'Numero Venda', valor: 80, icon: FaShoppingBag },
        { nome: 'Total Produto', valor: 87, icon: FaMoneyBill },
        { nome: 'Receita', valor: 200000, icon: FaMoneyBill },
        { nome: 'Funcionários', valor: 35, icon: FaMoneyBill },
        { nome: 'Fornecedor', valor: 5, icon: FaMoneyBill },
        { nome: 'Clientes', valor: 55, icon: FaMoneyBill }
    ];*/

    const [selectedOption, setSelectedOption] = useState('Vendas');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

  return (
    <div className="container-content">
        <div className="container-title">
            <h3>Report</h3>
        </div>

        <ListReport onSelectOption={handleOptionClick} selectedOption={selectedOption} />
        {selectedOption === 'Vendas' && <ReportVendas />}
        {selectedOption === 'Produto' && <ReportProduto />}
        {selectedOption === 'Receita' && <ReportReceita />}
        {selectedOption === 'Categoria' && <ReportCategoria />}
        
    </div>
  )
}

export default Report