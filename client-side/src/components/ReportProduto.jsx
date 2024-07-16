import React, { useState } from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const ReportProduto = () => {
  
    const data = [
      { produto: 'Agua Trindade 1L', receita: 75000 },
      { produto: 'Matutano', receita: 69000},
      { produto: 'Goodies', receita: 45000 },
      { produto: 'Iogurte', receita: 70000 },
      { produto: 'Leite', receita: 73000 },
      { produto: 'Bolacha', receita: 65000 },
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
                  <XAxis dataKey="produto" />
                  <YAxis dataKey="receita" />
                  <Tooltip />
                  <Legend />
                  <Bar type="monotone" dataKey="receita" fill="#8884d8" />
              </BarChart>
      </ResponsiveContainer>
  </div>
  )
}

export default ReportProduto