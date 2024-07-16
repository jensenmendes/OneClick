import React, { useEffect, useState } from 'react'

const ListProducts = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);

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


  return (
    <div className='product'>
        <ul>
            {
                filter.map((product, index) => (
                    <li key={index}>
                        <div className="product-img">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className="product-name">
                            {product.title}
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default ListProducts