import React from 'react'

const ListReport = ({ onSelectOption, selectedOption }) => {
  return (
    <div className='reportHeader'>
        <ul>
            <li onClick={() => onSelectOption('Vendas')}
            className={selectedOption === 'Vendas' ? 'active' : ''}
            >Vendas</li>
            <li onClick={() => onSelectOption('Produto')}
                className={selectedOption === 'Produto' ? 'active' : ''}
            >Produto</li>
            <li
            onClick={() => onSelectOption('Receita')}
            className={selectedOption === 'Receita' ? 'active' : ''}>
              Receitas</li>
            <li
            onClick={() => onSelectOption('Receita')}
            className={selectedOption === 'Despesa' ? 'active' : ''}>
              Despesas</li>
            <li
            onClick={() => onSelectOption('Categoria')}
            className={selectedOption === 'Categoria' ? 'active' : ''}>
              Categorias</li>
            <li onClick={() => onSelectOption('Vendas')}
            className={selectedOption === 'Fornecedor' ? 'active' : ''}
            >Fornecedor</li>
            <li onClick={() => onSelectOption('Vendas')}
            className={selectedOption === 'Cliente' ? 'active' : ''}
            >Clientes</li>
        </ul>
    </div>
  )
}

export default ListReport