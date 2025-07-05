import axios from 'axios';
import { StockData, HistoricalData, NewsItem, StockHealth } from '../types/stock';

// API Keys - Real API keys for live data
const ALPHA_VANTAGE_API_KEY = 'DQMOI2EXCRQTC1PB'; // Real Alpha Vantage API key
const NEWS_API_KEY = '87a3caceb0094eb0ace6fcfb1eac2055'; // Real NewsAPI key

// Alpha Vantage API for stock data
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// NewsAPI for news headlines
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Basic sentiment analysis keywords
const POSITIVE_KEYWORDS = [
  'surge', 'jump', 'rise', 'gain', 'up', 'positive', 'growth', 'profit', 'earnings', 'beat',
  'strong', 'bullish', 'rally', 'recovery', 'outperform', 'upgrade', 'buy', 'recommend'
];

const NEGATIVE_KEYWORDS = [
  'fall', 'drop', 'decline', 'down', 'negative', 'loss', 'miss', 'weak', 'bearish', 'crash',
  'plunge', 'downgrade', 'sell', 'avoid', 'risk', 'concern', 'worry', 'fear'
];

// Mock data for testing
const MOCK_STOCK_DATA: { [key: string]: StockData } = {
  'AAPL': {
    symbol: 'AAPL',
    currentPrice: 175.43,
    previousClose: 173.50,
    change: 1.93,
    changePercent: 1.11,
    high: 176.20,
    low: 172.80,
    volume: 45678900
  },
  'MSFT': {
    symbol: 'MSFT',
    currentPrice: 338.11,
    previousClose: 335.80,
    change: 2.31,
    changePercent: 0.69,
    high: 340.50,
    low: 334.20,
    volume: 23456700
  },
  'GOOGL': {
    symbol: 'GOOGL',
    currentPrice: 142.56,
    previousClose: 141.20,
    change: 1.36,
    changePercent: 0.96,
    high: 143.80,
    low: 140.50,
    volume: 34567800
  },
  'TSLA': {
    symbol: 'TSLA',
    currentPrice: 248.42,
    previousClose: 252.75,
    change: -4.33,
    changePercent: -1.71,
    high: 255.20,
    low: 246.80,
    volume: 56789000
  }
};

const MOCK_NEWS: { [key: string]: NewsItem[] } = {
  'AAPL': [
    {
      title: 'Apple Reports Strong Q4 Earnings, iPhone Sales Surge',
      description: 'Apple Inc. reported better-than-expected quarterly earnings with iPhone sales showing strong growth.',
      url: 'https://finance.yahoo.com/quote/AAPL',
      publishedAt: '2024-01-15T10:30:00Z',
      source: 'Yahoo Finance',
      sentiment: 'positive'
    },
    {
      title: 'Apple Stock Reaches New Highs on Strong Performance',
      description: 'Apple shares hit record levels as investors remain bullish on the company\'s future prospects.',
      url: 'https://www.marketwatch.com/investing/stock/aapl',
      publishedAt: '2024-01-14T15:45:00Z',
      source: 'MarketWatch',
      sentiment: 'positive'
    },
    {
      title: 'Apple Technical Analysis: Support and Resistance Levels',
      description: 'Technical analysts are monitoring key support and resistance levels for Apple as the stock continues to show volatility.',
      url: 'https://www.tradingview.com/symbols/AAPL/',
      publishedAt: '2024-01-13T14:20:00Z',
      source: 'TradingView',
      sentiment: 'neutral'
    }
  ],
  'MSFT': [
    {
      title: 'Microsoft Cloud Services Drive Revenue Growth',
      description: 'Microsoft\'s Azure cloud platform continues to show strong growth, boosting overall revenue.',
      url: 'https://finance.yahoo.com/quote/MSFT',
      publishedAt: '2024-01-15T09:15:00Z',
      source: 'Yahoo Finance',
      sentiment: 'positive'
    },
    {
      title: 'Microsoft Stock Analysis: Cloud Computing Dominance',
      description: 'Microsoft continues to dominate the cloud computing space with strong Azure performance.',
      url: 'https://www.marketwatch.com/investing/stock/msft',
      publishedAt: '2024-01-14T16:30:00Z',
      source: 'MarketWatch',
      sentiment: 'positive'
    }
  ],
  'GOOGL': [
    {
      title: 'Google Faces Regulatory Challenges in EU',
      description: 'Google parent Alphabet faces new regulatory scrutiny over its advertising practices.',
      url: 'https://finance.yahoo.com/quote/GOOGL',
      publishedAt: '2024-01-15T11:20:00Z',
      source: 'Yahoo Finance',
      sentiment: 'negative'
    },
    {
      title: 'Alphabet Stock Update: AI Investments Pay Off',
      description: 'Google\'s parent company Alphabet sees positive returns from its artificial intelligence investments.',
      url: 'https://www.marketwatch.com/investing/stock/googl',
      publishedAt: '2024-01-14T13:45:00Z',
      source: 'MarketWatch',
      sentiment: 'positive'
    }
  ],
  'TSLA': [
    {
      title: 'Tesla Stock Declines on Production Concerns',
      description: 'Tesla shares fell as investors worry about production delays and supply chain issues.',
      url: 'https://finance.yahoo.com/quote/TSLA',
      publishedAt: '2024-01-15T12:10:00Z',
      source: 'Yahoo Finance',
      sentiment: 'negative'
    },
    {
      title: 'Tesla Electric Vehicle Market Share Analysis',
      description: 'Tesla maintains strong position in the electric vehicle market despite increasing competition.',
      url: 'https://www.marketwatch.com/investing/stock/tsla',
      publishedAt: '2024-01-14T10:15:00Z',
      source: 'MarketWatch',
      sentiment: 'neutral'
    }
  ]
};

export class ApiService {
  // Fetch real-time stock data
  static async getStockData(symbol: string): Promise<StockData> {
    try {
      console.log(`Fetching stock data for ${symbol}`);
      
      // Check if we have mock data for this symbol (fallback)
      const mockData = MOCK_STOCK_DATA[symbol.toUpperCase()];
      
      // Try real API first
      if (ALPHA_VANTAGE_API_KEY) {
        try {
          const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
            params: {
              function: 'GLOBAL_QUOTE',
              symbol: symbol.toUpperCase(),
              apikey: ALPHA_VANTAGE_API_KEY
            }
          });

          const quote = response.data['Global Quote'];
          if (quote && Object.keys(quote).length > 0) {
            console.log(`Using real API data for ${symbol}`);
            return {
              symbol: quote['01. symbol'],
              currentPrice: parseFloat(quote['05. price']),
              previousClose: parseFloat(quote['08. previous close']),
              change: parseFloat(quote['09. change']),
              changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
              high: parseFloat(quote['03. high']),
              low: parseFloat(quote['04. low']),
              volume: parseInt(quote['06. volume'])
            };
          }
        } catch (apiError) {
          console.warn('Real API failed, falling back to mock data:', apiError);
        }
      }
      
      // Fallback to mock data
      if (mockData) {
        console.log(`Using mock stock data for ${symbol}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData;
      }

      // Generate random mock data for unknown symbols
      console.log(`Generating random mock data for ${symbol}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      const basePrice = 100 + Math.random() * 200;
      const change = (Math.random() - 0.5) * 10;
      return {
        symbol: symbol.toUpperCase(),
        currentPrice: basePrice,
        previousClose: basePrice - change,
        change: change,
        changePercent: (change / (basePrice - change)) * 100,
        high: basePrice + Math.random() * 5,
        low: basePrice - Math.random() * 5,
        volume: Math.floor(Math.random() * 50000000) + 1000000
      };
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw new Error('Failed to fetch stock data');
    }
  }

  // Fetch historical data
  static async getHistoricalData(symbol: string, days: number = 30): Promise<HistoricalData[]> {
    try {
      console.log(`Fetching historical data for ${symbol}, days: ${days}`);
      
      // Try real API first
      if (ALPHA_VANTAGE_API_KEY) {
        try {
          const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
            params: {
              function: 'TIME_SERIES_DAILY',
              symbol: symbol.toUpperCase(),
              apikey: ALPHA_VANTAGE_API_KEY
            }
          });

          const timeSeries = response.data['Time Series (Daily)'];
          console.log('Real API response:', response.data);
          if (timeSeries && Object.keys(timeSeries).length > 0) {
            console.log(`Using real API historical data for ${symbol}`);
            const dates = Object.keys(timeSeries).sort().slice(-days);
            const historicalData = dates.map(date => ({
              date,
              price: parseFloat(timeSeries[date]['4. close'])
            }));
            console.log('Real API historical data sample:', historicalData.slice(0, 3));
            return historicalData;
          } else {
            console.log('No time series data found in API response');
          }
        } catch (apiError) {
          console.warn('Real API failed, falling back to mock data:', apiError);
        }
      }
      
      // Fallback to mock historical data
      const mockData = MOCK_STOCK_DATA[symbol.toUpperCase()];
      let basePrice = 150; // Default base price
      
      if (mockData) {
        basePrice = mockData.currentPrice;
        console.log(`Using mock data base price: ${basePrice}`);
      } else {
        // Generate random base price for unknown symbols
        basePrice = 100 + Math.random() * 200;
        console.log(`Using random base price: ${basePrice}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
      const historicalData: HistoricalData[] = [];
      
      // Generate more realistic historical data with trends
      let currentPrice = basePrice;
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Create more realistic price movements (smaller daily changes)
        const dailyChange = (Math.random() - 0.5) * 0.04; // ±2% daily change
        currentPrice = currentPrice * (1 + dailyChange);
        
        // Add some trend (slight upward or downward bias)
        const trend = Math.sin(i * 0.1) * 0.01; // Small sinusoidal trend
        currentPrice = currentPrice * (1 + trend);
        
        historicalData.push({
          date: date.toISOString().split('T')[0],
          price: Math.max(0.01, currentPrice)
        });
      }
      
      console.log(`Generated ${historicalData.length} mock historical data points`);
      console.log('Sample historical data:', historicalData.slice(0, 3));
      return historicalData;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw new Error('Failed to fetch historical data');
    }
  }

  // Fetch news headlines
  static async getNews(symbol: string): Promise<NewsItem[]> {
    try {
      console.log(`Fetching news for ${symbol}`);
      
      // Try real API first
      if (NEWS_API_KEY) {
        try {
          const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
            params: {
              q: symbol,
              language: 'en',
              sortBy: 'publishedAt',
              pageSize: 10,
              apiKey: NEWS_API_KEY
            }
          });

          if (response.data.articles && response.data.articles.length > 0) {
            console.log(`Using real API news for ${symbol}`);
            return response.data.articles.map((article: any) => ({
              title: article.title,
              description: article.description || '',
              url: article.url,
              publishedAt: article.publishedAt,
              source: article.source.name,
              sentiment: this.analyzeSentiment(article.title + ' ' + (article.description || ''))
            }));
          }
        } catch (apiError) {
          console.warn('Real API failed, falling back to mock data:', apiError);
        }
      }
      
      // Fallback to mock news
      const mockNews = MOCK_NEWS[symbol.toUpperCase()];
      if (mockNews) {
        console.log(`Using mock news for ${symbol}`);
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockNews;
      }

      // Generate fallback mock news for any symbol
      console.log(`Generating mock news for ${symbol}`);
      await new Promise(resolve => setTimeout(resolve, 400));
      return [
        {
          title: `${symbol.toUpperCase()} Stock Analysis: Market Trends and Outlook`,
          description: `Recent analysis shows ${symbol.toUpperCase()} stock performance and market trends. Investors are closely watching the company's quarterly results and future projections.`,
          url: `https://finance.yahoo.com/quote/${symbol.toUpperCase()}`,
          publishedAt: new Date().toISOString(),
          source: 'Yahoo Finance',
          sentiment: 'neutral'
        },
        {
          title: `${symbol.toUpperCase()} Reports Quarterly Earnings`,
          description: `${symbol.toUpperCase()} has released its latest quarterly earnings report, showing mixed results across different business segments.`,
          url: `https://www.marketwatch.com/investing/stock/${symbol.toLowerCase()}`,
          publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          source: 'MarketWatch',
          sentiment: 'neutral'
        },
        {
          title: `${symbol.toUpperCase()} Technical Analysis: Support and Resistance Levels`,
          description: `Technical analysts are monitoring key support and resistance levels for ${symbol.toUpperCase()} as the stock continues to show volatility in current market conditions.`,
          url: `https://www.tradingview.com/symbols/${symbol.toUpperCase()}/`,
          publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          source: 'TradingView',
          sentiment: 'neutral'
        }
      ];
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch news');
    }
  }

  // Basic sentiment analysis
  static analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;

    POSITIVE_KEYWORDS.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        positiveScore++;
      }
    });

    NEGATIVE_KEYWORDS.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        negativeScore++;
      }
    });

    if (positiveScore > negativeScore) {
      return 'positive';
    } else if (negativeScore > positiveScore) {
      return 'negative';
    } else {
      return 'neutral';
    }
  }

  // Calculate stock health indicator
  static calculateStockHealth(
    stockData: StockData,
    historicalData: HistoricalData[],
    news: NewsItem[]
  ): StockHealth {
    // Price trend analysis - more sophisticated
    const recentPrices = historicalData.slice(-7).map(d => d.price);
    let priceTrend: 'rising' | 'falling' | 'stable' = 'stable';
    
    if (recentPrices.length >= 3) {
      const firstHalf = recentPrices.slice(0, Math.floor(recentPrices.length / 2));
      const secondHalf = recentPrices.slice(Math.floor(recentPrices.length / 2));
      const firstAvg = firstHalf.reduce((sum, price) => sum + price, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, price) => sum + price, 0) / secondHalf.length;
      
      const changePercent = ((secondAvg - firstAvg) / firstAvg) * 100;
      
      if (changePercent > 2) {
        priceTrend = 'rising';
      } else if (changePercent < -2) {
        priceTrend = 'falling';
      } else {
        priceTrend = 'stable';
      }
    }

    // News sentiment analysis
    const sentimentCounts = news.reduce((acc, item) => {
      acc[item.sentiment]++;
      return acc;
    }, { positive: 0, negative: 0, neutral: 0 });

    const totalNews = news.length;
    const positiveRatio = totalNews > 0 ? sentimentCounts.positive / totalNews : 0;
    const negativeRatio = totalNews > 0 ? sentimentCounts.negative / totalNews : 0;

    let newsSentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (positiveRatio > 0.4) {
      newsSentiment = 'positive';
    } else if (negativeRatio > 0.4) {
      newsSentiment = 'negative';
    }

    // Volume indicator - compare with historical average
    const avgVolume = historicalData.length > 0 
      ? historicalData.reduce((sum, d) => sum + stockData.volume, 0) / historicalData.length 
      : stockData.volume;
    
    const volumeRatio = stockData.volume / avgVolume;
    let volumeIndicator: 'high' | 'medium' | 'low' = 'medium';
    
    if (volumeRatio > 1.3) {
      volumeIndicator = 'high';
    } else if (volumeRatio < 0.7) {
      volumeIndicator = 'low';
    }

    // Price change analysis
    const priceChangePercent = Math.abs(stockData.changePercent);
    const isSignificantChange = priceChangePercent > 3;

    // Calculate overall status and confidence with more realistic logic
    let status: 'Buy' | 'Watch' | 'Avoid' = 'Watch';
    let confidence = 0.5;

    // More sophisticated decision logic
    if (priceTrend === 'rising' && newsSentiment === 'positive' && stockData.changePercent > 0) {
      status = 'Buy';
      confidence = 0.75 + (positiveRatio * 0.2);
    } else if (priceTrend === 'falling' && newsSentiment === 'negative' && stockData.changePercent < 0) {
      status = 'Avoid';
      confidence = 0.75 + (negativeRatio * 0.2);
    } else if (priceTrend === 'rising' && stockData.changePercent > 1) {
      status = 'Buy';
      confidence = 0.6;
    } else if (priceTrend === 'falling' && stockData.changePercent < -1) {
      status = 'Avoid';
      confidence = 0.6;
    } else if (Math.abs(stockData.changePercent) < 0.5 && newsSentiment === 'neutral') {
      status = 'Watch';
      confidence = 0.4;
    } else {
      // Mixed signals
      status = 'Watch';
      confidence = 0.5;
    }

    // Adjust confidence based on volume
    if (volumeIndicator === 'high') {
      confidence += 0.1;
    } else if (volumeIndicator === 'low') {
      confidence -= 0.1;
    }

    // Cap confidence at 0.95
    confidence = Math.min(confidence, 0.95);

    return {
      status,
      priceTrend,
      newsSentiment,
      volumeIndicator,
      confidence
    };
  }
}
