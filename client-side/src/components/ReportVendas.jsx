import React, { useState } from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const ReportVendas = () => {

    const data = [
        { date: '2023-12-19', sales: 23 },
        { date: '2023-12-20', sales: 30 },
        { date: '2023-12-21', sales: 20 },
        { date: '2023-12-22', sales: 36 },
        { date: '2023-12-23', sales: 45 },
        { date: '2023-12-24', sales: 54 },
    ];

    //filtro

    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('all');

    const handleYearChange = (value) => {
        setSelectedYear(value);
    };

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    };

    const filteredData = data.filter(item => (
        (selectedYear === 'all' || new Date(item.date).getFullYear().toString() === selectedYear) &&
        (selectedMonth === 'all' || new Date(item.date).getMonth().toString() === selectedMonth)
    ));

  return (
    <div className='report-body'>
        <div className="report-filter">
            <form action="">
                <div className="input-camp">
                    <label htmlFor="">Data Inicio</label>
                    <input type="date" />
                </div>
                <div className="input-camp">
                    <label htmlFor="">Data Fim</label>
                    <input type="date" />
                </div>
                <button>Filtrar</button>
            </form>
        </div>

        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={filteredData}
                margin={{
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 5,
                }}
                style={{ backgroundColor: 'white', borderRadius: '10px' }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="sales" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default ReportVendas