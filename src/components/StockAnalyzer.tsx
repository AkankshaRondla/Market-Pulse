import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { ApiService } from '../services/api';
import { StockData, HistoricalData, NewsItem, StockHealth } from '../types/stock';
import StockCard from './StockCard';
import ChartCard from './ChartCard';
import NewsCard from './NewsCard';
import HealthIndicator from './HealthIndicator';
import PricePrediction from './PricePrediction';
import { useTheme } from '../contexts/ThemeContext';

const StockAnalyzer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [health, setHealth] = useState<StockHealth | null>(null);

  const handleSearch = async () => {
    if (!ticker.trim()) {
      setError('Please enter a stock ticker');
      return;
    }

    setLoading(true);
    setError('');
    setStockData(null);
    setHistoricalData([]);
    setNews([]);
    setHealth(null);

    try {
      // Fetch all data in parallel
      const [stock, historical, newsData] = await Promise.all([
        ApiService.getStockData(ticker.toUpperCase()),
        ApiService.getHistoricalData(ticker.toUpperCase(), 30),
        ApiService.getNews(ticker.toUpperCase())
      ]);

      setStockData(stock);
      setHistoricalData(historical);
      setNews(newsData);

      // Calculate health indicator
      const healthData = ApiService.calculateStockHealth(stock, historical, newsData);
      setHealth(healthData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="stock-analyzer">
      <div className="search-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div className="search-bar-group" style={{ display: 'flex', background: isDarkMode ? '#1e293b' : '#fff', borderRadius: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', alignItems: 'center', padding: '0.25rem', maxWidth: 1200, minWidth: 800, width: '100%' }}>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Enter stock ticker (e.g., TSLA, AAPL)"
            className="search-input"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '2rem', color: isDarkMode ? '#f1f5f9' : '#222', minWidth: '600px', width: '100%' }}
            disabled={loading}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !ticker.trim()}
            className="search-button"
            style={{ background: 'linear-gradient(90deg, #7f4fff 0%, #4f46e5 100%)', border: 'none', borderRadius: '2rem', height: '2.7rem', fontWeight: 700, fontSize: '1.1rem', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', boxShadow: '0 2px 8px rgba(127,79,255,0.10)', marginLeft: '-1.5rem', zIndex: 1, position: 'relative' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Search style={{ width: '1.2rem', height: '1.2rem', marginRight: '0.3rem' }} />
              Search
            </span>
          </button>
        </div>
        {error && <div className="error-message" style={{ marginTop: '1rem' }}>{error}</div>}
      </div>

      {loading && (
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
          <p>Fetching real-time market data...</p>
        </div>
      )}

      {stockData && health && (
        <div className="dashboard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <StockCard stockData={stockData} />
          <HealthIndicator health={health} />
          <PricePrediction stockData={stockData} historicalData={historicalData} />
          <ChartCard historicalData={historicalData} stockData={stockData} />
          <NewsCard news={news} />
        </div>
      )}
    </div>
  );
};

export default StockAnalyzer; 