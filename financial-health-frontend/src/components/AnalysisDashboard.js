import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function AnalysisDashboard({ dataId }) {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/financials/analyze/${dataId}`);
        setAnalysis(res.data);
      } catch (error) {
        console.error('Error fetching analysis');
      }
    };
    fetchAnalysis();
  }, [dataId]);

  if (!analysis) return <div>Loading...</div>;

  const chartData = [
    { name: 'Creditworthiness', value: analysis.creditworthiness },
  ];

  return (
    <div>
      <h2>Analysis</h2>
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#0f766e" />
      </BarChart>
      <ul>
        <li>Risks: {analysis.risks.join(', ')}</li>
        <li>Recommendations: {analysis.recommendations.join(', ')}</li>
        <li>Forecast: {JSON.stringify(analysis.forecast)}</li>
      </ul>
    </div>
  );
}

export default AnalysisDashboard;