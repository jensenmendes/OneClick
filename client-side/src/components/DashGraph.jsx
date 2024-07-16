import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const DashGraph = () => {

  const data = [
    { date: '2023-12-19', sales: 23 },
    { date: '2023-12-20', sales: 30 },
    { date: '2023-12-21', sales: 20 },
    { date: '2023-12-22', sales: 36 },
    { date: '2023-12-23', sales: 45 },
    { date: '2023-12-24', sales: 54 },
];

return (
    <ResponsiveContainer width="100%" height="90%">
        <LineChart
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
            <YAxis dataKey="sales" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    </ResponsiveContainer>
);
}

export default DashGraph