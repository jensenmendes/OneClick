import React, { useState } from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'


const ReportReceita = () => {
  const data = [
    { date: '2023-12-19', receita: 150000 },
    { date: '2023-12-20', receita: 175000 },
    { date: '2023-12-21', receita: 134000 },
    { date: '2023-12-22', receita: 180000 },
    { date: '2023-12-23', receita: 176000 },
    { date: '2023-12-24', receita: 200000 },
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
        
        <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
        >
            <option value="all">Todos os Anos</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2023">2024</option>
        </select>

        <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
        >
            <option value="all">Todos os Meses</option>
            <option value="0">Janeiro</option>
            <option value="1">Fevereiro</option>
            <option value="12">Dezembro</option>
        </select>
    </div>

    <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                <YAxis dataKey="receita" />
                <Tooltip />
                <Legend />
                <Bar dataKey="receita" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
</div>
)
}

export default ReportReceita