import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, Target, AlertTriangle } from 'lucide-react';
import { StockHealth } from '../types/stock';
import { useTheme } from '../contexts/ThemeContext';

interface HealthIndicatorProps {
  health: StockHealth;
}

const HealthIndicator: React.FC<HealthIndicatorProps> = ({ health }) => {
  const { isDarkMode } = useTheme();
  const getStatusIcon = () => {
    switch (health.status) {
      case 'Buy':
        return <Target size={24} />;
      case 'Watch':
        return <Activity size={24} />;
      case 'Avoid':
        return <AlertTriangle size={24} />;
      default:
        return <Activity size={24} />;
    }
  };

  const getTrendIcon = () => {
    switch (health.priceTrend) {
      case 'rising':
        return <TrendingUp size={16} />;
      case 'falling':
        return <TrendingDown size={16} />;
      case 'stable':
        return <Minus size={16} />;
      default:
        return <Minus size={16} />;
    }
  };

  const getSentimentIcon = () => {
    switch (health.newsSentiment) {
      case 'positive':
        return <TrendingUp size={16} />;
      case 'negative':
        return <TrendingDown size={16} />;
      case 'neutral':
        return <Minus size={16} />;
      default:
        return <Minus size={16} />;
    }
  };

  return (
    <div className="card health-indicator" style={{ borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.06)', background: isDarkMode ? '#1e293b' : '#fff', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 520, margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        {getStatusIcon()}
        <h2 className="card-title" style={{ fontSize: '1.6rem', fontWeight: 700, color: isDarkMode ? '#f1f5f9' : '#1a202c', margin: 0 }}>Stock Health</h2>
      </div>
      <div style={{ borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`, margin: '0.5rem 0 1.2rem 0' }} />
      <div className="health-metrics" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '1.13rem', color: isDarkMode ? '#f1f5f9' : '#22292f', fontWeight: 500 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '1rem',
          background: isDarkMode 
            ? (health.status === 'Buy' ? '#064e3b' : health.status === 'Avoid' ? '#7f1d1d' : '#78350f')
            : (health.status === 'Buy' ? '#dcfce7' : health.status === 'Avoid' ? '#fee2e2' : '#fef3c7'),
          color: isDarkMode 
            ? (health.status === 'Buy' ? '#4ade80' : health.status === 'Avoid' ? '#f87171' : '#fbbf24')
            : (health.status === 'Buy' ? '#166534' : health.status === 'Avoid' ? '#991b1b' : '#92400e'),
          fontWeight: 700,
          fontSize: '1rem',
          border: '2px solid',
          borderColor: isDarkMode 
            ? (health.status === 'Buy' ? '#22c55e' : health.status === 'Avoid' ? '#ef4444' : '#f59e0b')
            : (health.status === 'Buy' ? '#22c55e' : health.status === 'Avoid' ? '#ef4444' : '#f59e0b'),
          boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          width: 'fit-content'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = isDarkMode 
            ? '0 4px 16px rgba(0,0,0,0.4)' 
            : '0 4px 16px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = isDarkMode 
            ? '0 2px 8px rgba(0,0,0,0.3)' 
            : '0 2px 8px rgba(0,0,0,0.1)';
        }}>
          {getStatusIcon()}
          <span style={{ marginLeft: '0.5rem' }}>{health.status}</span>
        </div>
        <div>Price Trend<br />— {health.priceTrend.charAt(0).toUpperCase() + health.priceTrend.slice(1)}</div>
        <div>News Sentiment<br />— {health.newsSentiment.charAt(0).toUpperCase() + health.newsSentiment.slice(1)}</div>
        <div>Volume Activity<br />{health.volumeIndicator.charAt(0).toUpperCase() + health.volumeIndicator.slice(1)}</div>
        <div>Confidence<br />{(health.confidence * 100).toFixed(0)}%</div>
      </div>
      <div style={{ marginTop: '1.2rem', width: '100%', height: '0.5rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
        <div style={{ width: `${health.confidence * 100}%`, height: '100%', background: '#a5b4fc', borderRadius: '0.5rem' }} />
      </div>
    </div>
  );
};

export default HealthIndicator; 