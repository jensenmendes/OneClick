import React, { useState } from 'react'
import {PieChart, Pie,  Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts'


const ReportCategoria = () => {
  const data = [
    { categoria: 'Bebidas', receita: 75000 },
    { categoria: 'Snacks', receita: 69000},
    { categoria: 'Lacticinio', receita: 45000 },
    { categoria: 'Refrigerante', receita: 70000 },
    { categoria: 'Bebidas Alcolicas', receita: 73000 },
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
    <PieChart>
          <Pie
            data={filteredData} 
            dataKey="receita"
            nameKey="categoria"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
    </ResponsiveContainer>
</div>
)
}

export default ReportCategoria