import React from 'react'

const ListCategory = () => {

    const listCategory = ['Bebidas', 'Snacks', 'Congelados', 'Eletronicos', 'Bebidas Alcolicas', 'Detergentes']

  return (
    <div className='category'>
        <ul>
            {
                listCategory.map((category, index) => (
                    <li key={index}>{category}</li>
                ))
            }
        </ul>
    </div>
  )
}

export default ListCategory