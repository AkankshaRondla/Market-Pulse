import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { StockData } from '../types/stock';
import { useTheme } from '../contexts/ThemeContext';

interface StockCardProps {
  stockData: StockData;
}

// Helper functions
const formatPrice = (price: number) => `$${price.toFixed(2)}`;
const formatVolume = (volume: number) => {
  if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`;
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`;
  if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`;
  return volume.toString();
};

const StockCard: React.FC<StockCardProps> = ({ stockData }) => {
  const { isDarkMode } = useTheme();
  const isPositive = stockData.change >= 0;
  const ChangeIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="card stock-card" style={{ borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.06)', background: isDarkMode ? '#1e293b' : '#fff', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 420, margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title" style={{ fontSize: '1.6rem', fontWeight: 700, color: isDarkMode ? '#f1f5f9' : '#1a202c', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          Stock Information
        </h2>
      </div>
      <div className="card-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="price-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div className="current-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="price-label" style={{ color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Current Price</span>
            <span className="price-value" style={{ fontSize: '2.6rem', fontWeight: 700, color: isDarkMode ? '#f1f5f9' : '#1a202c', letterSpacing: '-0.02em' }}>{formatPrice(stockData.currentPrice)}</span>
          </div>
          <div className={`price-change ${isPositive ? 'positive' : 'negative'}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontWeight: 600, fontSize: '1.2rem', color: isPositive ? '#22c55e' : '#ef4444' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {isPositive ? (
                <TrendingUp className="trend-icon" style={{ color: '#22c55e', width: '1.3rem', height: '1.3rem' }} />
              ) : (
                <TrendingDown className="trend-icon" style={{ color: '#ef4444', width: '1.3rem', height: '1.3rem' }} />
              )}
              <span className="change-value">
                {isPositive ? '+' : ''}{formatPrice(stockData.change)}
              </span>
            </span>
            <span style={{ fontSize: '1.05rem', color: isPositive ? '#22c55e' : '#ef4444', fontWeight: 500, marginTop: '0.1rem' }}>
              ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`, margin: '0.5rem 0 0.5rem 0' }} />
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem 1.5rem' }}>
          <div className="stat-item">
            <span className="stat-label" style={{ color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1rem' }}>Volume</span>
            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.15rem', color: isDarkMode ? '#f1f5f9' : '#1a202c' }}>{formatVolume(stockData.volume)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label" style={{ color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1rem' }}>High</span>
            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.15rem', color: isDarkMode ? '#f1f5f9' : '#1a202c' }}>{formatPrice(stockData.high)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label" style={{ color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1rem' }}>Low</span>
            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.15rem', color: isDarkMode ? '#f1f5f9' : '#1a202c' }}>{formatPrice(stockData.low)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label" style={{ color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1rem' }}>Open</span>
            <span className="stat-value" style={{ fontWeight: 700, fontSize: '1.15rem', color: isDarkMode ? '#f1f5f9' : '#1a202c' }}>{formatPrice(stockData.previousClose)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard; 