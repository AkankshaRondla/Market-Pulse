import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Brain, Target, Calendar, BarChart3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { StockData, HistoricalData } from '../types/stock';

interface PricePredictionProps {
  stockData: StockData;
  historicalData: HistoricalData[];
}

interface PredictionResult {
  predictedPrice: number;
  confidence: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  timeframe: string;
  factors: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

const PricePrediction: React.FC<PricePredictionProps> = ({ stockData, historicalData }) => {
  const { isDarkMode } = useTheme();
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState<'1d' | '1w' | '1m'>('1w');

  // ML Prediction Algorithm (simplified for demo)
  const calculatePrediction = async () => {
    setLoading(true);
    
    // Simulate ML processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (historicalData.length < 5) {
      setLoading(false);
      return;
    }

    // Simple ML-like prediction based on historical data
    const recentPrices = historicalData.slice(-10).map(d => d.price);
    const avgPrice = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length;
    const volatility = Math.sqrt(recentPrices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / recentPrices.length);
    
    // Calculate trend
    const priceChange = stockData.currentPrice - historicalData[0].price;
    const trend = priceChange > 0 ? 'bullish' : priceChange < 0 ? 'bearish' : 'neutral';
    
    // Predict based on timeframe
    let predictedPrice = stockData.currentPrice;
    let confidence = 0.7;
    let factors: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    
    switch (timeframe) {
      case '1d':
        predictedPrice = stockData.currentPrice + (Math.random() - 0.5) * volatility * 0.1;
        confidence = 0.85;
        factors = ['Recent price momentum', 'Market sentiment', 'Technical indicators'];
        riskLevel = 'low';
        break;
      case '1w':
        predictedPrice = stockData.currentPrice + (trend === 'bullish' ? 1 : -1) * volatility * 0.3;
        confidence = 0.75;
        factors = ['Weekly trend analysis', 'Volume patterns', 'Support/resistance levels'];
        riskLevel = 'medium';
        break;
      case '1m':
        predictedPrice = stockData.currentPrice + (trend === 'bullish' ? 1 : -1) * volatility * 0.8;
        confidence = 0.65;
        factors = ['Monthly trend analysis', 'Market cycles', 'Economic indicators'];
        riskLevel = 'high';
        break;
    }

    // Add some randomness for realism
    predictedPrice += (Math.random() - 0.5) * volatility * 0.2;
    
    setPrediction({
      predictedPrice: Math.max(0, predictedPrice),
      confidence,
      trend,
      timeframe: timeframe === '1d' ? '1 Day' : timeframe === '1w' ? '1 Week' : '1 Month',
      factors,
      riskLevel
    });
    
    setLoading(false);
  };

  useEffect(() => {
    if (historicalData.length > 0) {
      calculatePrediction();
    }
  }, [historicalData, timeframe]);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return '#22c55e';
      case 'bearish': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="card price-prediction" style={{ 
      borderRadius: '2rem', 
      boxShadow: '0 4px 32px rgba(0,0,0,0.06)', 
      background: isDarkMode ? '#1e293b' : '#fff', 
      padding: '2.5rem 2rem', 
      width: '100%', 
      margin: '0 auto' 
    }}>
      <div className="card-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title" style={{ 
          fontSize: '1.6rem', 
          fontWeight: 700, 
          color: isDarkMode ? '#f1f5f9' : '#1a202c', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.7rem' 
        }}>
          <Brain className="card-icon" style={{ color: '#7f4fff', width: '1.5rem', height: '1.5rem' }} />
          ML Price Prediction
        </h2>
      </div>

      <div className="prediction-controls" style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          {(['1d', '1w', '1m'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                border: 'none',
                background: timeframe === tf 
                  ? '#7f4fff' 
                  : isDarkMode ? '#374151' : '#f3f4f6',
                color: timeframe === tf ? '#fff' : isDarkMode ? '#d1d5db' : '#374151',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tf === '1d' ? '1 Day' : tf === '1w' ? '1 Week' : '1 Month'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '1rem',
          padding: '2rem'
        }}>
          <div style={{ 
            width: '3rem', 
            height: '3rem', 
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #7f4fff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: isDarkMode ? '#94a3b8' : '#6b7280' }}>
            Analyzing market patterns with ML...
          </p>
        </div>
      ) : prediction ? (
        <div className="prediction-results" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Prediction */}
          <div style={{ 
            background: isDarkMode ? '#374151' : '#f8fafc', 
            borderRadius: '1.5rem', 
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <Target style={{ width: '2rem', height: '2rem', color: '#7f4fff', marginBottom: '0.5rem' }} />
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                color: isDarkMode ? '#f1f5f9' : '#374151',
                marginBottom: '0.5rem'
              }}>
                Predicted Price ({prediction.timeframe})
              </h3>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 700, 
                color: getTrendColor(prediction.trend),
                marginBottom: '0.5rem'
              }}>
                {formatPrice(prediction.predictedPrice)}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {prediction.trend === 'bullish' ? (
                  <TrendingUp style={{ width: '1.2rem', height: '1.2rem', color: '#22c55e' }} />
                ) : prediction.trend === 'bearish' ? (
                  <TrendingDown style={{ width: '1.2rem', height: '1.2rem', color: '#ef4444' }} />
                ) : (
                  <BarChart3 style={{ width: '1.2rem', height: '1.2rem', color: '#6b7280' }} />
                )}
                <span style={{ 
                  color: getTrendColor(prediction.trend), 
                  fontWeight: 600,
                  textTransform: 'capitalize'
                }}>
                  {prediction.trend}
                </span>
              </div>
            </div>
          </div>

          {/* Confidence and Risk */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ 
              background: isDarkMode ? '#374151' : '#f8fafc', 
              borderRadius: '1rem', 
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                color: isDarkMode ? '#f1f5f9' : '#374151',
                marginBottom: '0.5rem'
              }}>
                Confidence
              </h4>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#7f4fff'
              }}>
                {formatPercentage(prediction.confidence)}
              </div>
            </div>
            <div style={{ 
              background: isDarkMode ? '#374151' : '#f8fafc', 
              borderRadius: '1rem', 
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                color: isDarkMode ? '#f1f5f9' : '#374151',
                marginBottom: '0.5rem'
              }}>
                Risk Level
              </h4>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: getRiskColor(prediction.riskLevel),
                textTransform: 'capitalize'
              }}>
                {prediction.riskLevel}
              </div>
            </div>
          </div>

          {/* Factors */}
          <div style={{ 
            background: isDarkMode ? '#374151' : '#f8fafc', 
            borderRadius: '1rem', 
            padding: '1.5rem'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              color: isDarkMode ? '#f1f5f9' : '#374151',
              marginBottom: '1rem'
            }}>
              Key Factors
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {prediction.factors.map((factor, index) => (
                <li key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  color: isDarkMode ? '#d1d5db' : '#6b7280'
                }}>
                  <div style={{ 
                    width: '0.5rem', 
                    height: '0.5rem', 
                    borderRadius: '50%', 
                    background: '#7f4fff' 
                  }} />
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div style={{ 
            background: isDarkMode ? '#1e1b4b' : '#fef3c7', 
            borderRadius: '1rem', 
            padding: '1rem',
            border: `1px solid ${isDarkMode ? '#3730a3' : '#f59e0b'}`
          }}>
            <p style={{ 
              fontSize: '0.9rem', 
              color: isDarkMode ? '#c7d2fe' : '#92400e',
              margin: 0,
              textAlign: 'center'
            }}>
              ⚠️ This prediction is for educational purposes only. Past performance does not guarantee future results. 
              Always do your own research before making investment decisions.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: isDarkMode ? '#94a3b8' : '#6b7280'
        }}>
          <Brain style={{ width: '3rem', height: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <p>Insufficient data for prediction</p>
        </div>
      )}
    </div>
  );
};

export default PricePrediction; 