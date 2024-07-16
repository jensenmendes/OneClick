import React, { useEffect, useState } from 'react'

const ListTransaction = () => {

    const columns = [
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
    }, [])

  return (
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
        <tfoot>
            <tr>
                <td colSpan={3}>Total</td>
                <td colSpan={3}>3000</td>
            </tr>
        </tfoot>
    </table>
  )
}

export default ListTransaction