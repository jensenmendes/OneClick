import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashReceita = () => {
    const data = [
        { date: '2023-12-19', receita: 150000 },
        { date: '2023-12-20', receita: 175000 },
        { date: '2023-12-21', receita: 134000 },
        { date: '2023-12-22', receita: 180000 },
        { date: '2023-12-23', receita: 176000 },
        { date: '2023-12-24', receita: 200000 },
    ];

    return (
        <ResponsiveContainer width="100%" height="90%">
            <BarChart
                data={data}
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
    );
}

export default DashReceita;
