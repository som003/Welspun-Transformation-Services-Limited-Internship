import React, { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import axios from 'axios';

const Dashboard = () => {
    const [charts, setCharts] = useState([]);

    useEffect(() => {
        const fetchCharts = async () => {
            const { data } = await axios.get('/api/charts', {
                headers: { Authorization: Bearer ${localStorage.getItem('token')} },
            });
            setCharts(data);
        };
        fetchCharts();
    }, []);

    const addChart = (chartData) => {
        setCharts([...charts, chartData]);
        // Save chart to backend
    };

    return (
        <div>
            <button onClick={() => addChart({ type: 'bar', data: {/* ... */} })}>Add Bar Chart</button>
            {charts.map((chart, index) => (
                <BarChart key={index} data={chart.data} />
            ))}
        </div>
    );
};

export default Dashboard;