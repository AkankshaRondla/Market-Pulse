import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { HistoricalData, StockData } from '../types/stock';
import { useTheme } from '../contexts/ThemeContext';

interface ChartCardProps {
  historicalData: HistoricalData[];
  stockData: StockData;
}

const ChartCard: React.FC<ChartCardProps> = ({ historicalData, stockData }) => {
  const { isDarkMode } = useTheme();
  const formatPrice = (value: number) => `$${value.toFixed(2)}`;
  
  const formatDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Debug logging
  console.log('ChartCard received historicalData:', historicalData);
  console.log('ChartCard received stockData:', stockData);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '12px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1f2937' }}>
            {formatDate(label)}
          </p>
          <p style={{ margin: 0, color: '#667eea', fontWeight: '600' }}>
            Price: {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Check if we have valid data
  if (!historicalData || historicalData.length === 0) {
    return (
      <div className="card chart-card">
        <div className="card-header">
          <TrendingUp className="card-icon" />
          <h2 className="card-title">Price History (30 Days)</h2>
        </div>
        <div className="chart-container">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '300px',
            color: '#6b7280',
            fontSize: '16px'
          }}>
            No historical data available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card chart-card" style={{ borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.06)', background: isDarkMode ? '#1e293b' : '#fff', padding: '2.5rem 2rem', width: '100%', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title" style={{ fontSize: '1.6rem', fontWeight: 700, color: isDarkMode ? '#f1f5f9' : '#1a202c', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <TrendingUp className="card-icon" style={{ color: '#7f4fff', width: '1.5rem', height: '1.5rem' }} />
          Price History (30 Days)
        </h2>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatPrice}
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#667eea" 
              strokeWidth={3}
              dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2, fill: '#ffffff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard; 