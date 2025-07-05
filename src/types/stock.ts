export interface StockData {
  symbol: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  marketCap?: number;
}

export interface HistoricalData {
  date: string;
  price: number;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface StockHealth {
  status: 'Buy' | 'Watch' | 'Avoid';
  priceTrend: 'rising' | 'falling' | 'stable';
  newsSentiment: 'positive' | 'negative' | 'neutral';
  volumeIndicator: 'high' | 'medium' | 'low';
  confidence: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}


