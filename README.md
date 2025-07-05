# Market Pulse 📈

A modern, real-time stock analysis web application that helps users analyze stock performance by entering ticker symbols. Market Pulse provides comprehensive insights including real-time stock data, historical price charts, news sentiment analysis, and intelligent stock health indicators.

## ✨ Features

### 📊 Real-Time Stock Data
- Current stock price and daily change
- High/low prices for the day
- Trading volume
- Percentage change with visual indicators

### 📈 Historical Price Analysis
- Interactive 30-day price chart using Recharts
- Price trend analysis
- High/low/average price statistics
- Responsive chart with tooltips

### 📰 News & Sentiment Analysis
- Recent news headlines related to the stock
- Basic sentiment analysis (positive, negative, neutral)
- Sentiment classification using keyword analysis
- News source attribution and timestamps

### 🎯 Stock Health Indicator
- Intelligent analysis combining multiple factors:
  - Price trend direction (rising/falling/stable)
  - News sentiment analysis
  - Volume activity levels
- Provides actionable recommendations: **Buy**, **Watch**, or **Avoid**
- Confidence percentage for each recommendation

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Beautiful gradient background with glassmorphism effects
- Color-coded elements (green for positive, red for negative)
- Smooth animations and hover effects
- Clean, intuitive interface

## 🚀 Live APIs Used

### Financial Data
- **Alpha Vantage API**: Real-time stock quotes and historical data
  - Global Quote endpoint for current stock data
  - Time Series Daily for historical price data

### News Data
- **NewsAPI**: Recent news headlines and articles
  - Everything endpoint for comprehensive news search
  - Filtered by stock ticker and language

### Sentiment Analysis
- **Custom Implementation**: Basic keyword-based sentiment analysis
  - Positive keywords: surge, jump, rise, gain, growth, profit, etc.
  - Negative keywords: fall, drop, decline, loss, weak, crash, etc.
  - Neutral classification for balanced content

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with modern features (Grid, Flexbox, CSS Variables)
- **Charts**: Recharts for interactive data visualization
- **Icons**: Lucide React for beautiful, consistent icons
- **HTTP Client**: Axios for API requests
- **Build Tool**: Create React App

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd market-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build
```bash
npm run build
```

## 🔧 API Configuration

The application uses demo API keys by default. For production use, you should:

1. **Get API Keys**:
   - [Alpha Vantage](https://www.alphavantage.co/support/#api-key) - Free tier available
   - [NewsAPI](https://newsapi.org/register) - Free tier available

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
   REACT_APP_NEWS_API_KEY=your_news_api_key
   ```

3. **Update API Service**:
   Modify `src/services/api.ts` to use environment variables:
   ```typescript
   const ALPHA_VANTAGE_API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY || 'demo';
   const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'demo';
   ```

## 📱 Usage

1. **Enter Stock Ticker**: Type a valid stock symbol (e.g., AAPL, TSLA, MSFT, GOOGL)
2. **Click Analyze**: The app will fetch real-time data from multiple APIs
3. **Review Results**: 
   - Check current stock price and daily performance
   - View the 30-day price chart
   - Read recent news with sentiment analysis
   - See the stock health recommendation

## 🎯 Stock Health Algorithm

The application uses a sophisticated algorithm to determine stock health:

### Factors Considered:
1. **Price Trend** (7-day analysis)
   - Rising: Positive indicator
   - Falling: Negative indicator
   - Stable: Neutral indicator

2. **News Sentiment** (Recent headlines)
   - Positive sentiment: Favorable indicator
   - Negative sentiment: Concerning indicator
   - Neutral sentiment: Balanced indicator

3. **Volume Activity**
   - High volume: Increased volatility/interest
   - Low volume: Reduced activity
   - Medium volume: Normal trading activity

### Recommendations:
- **Buy**: Positive price trend + positive news sentiment
- **Watch**: Mixed signals or neutral indicators
- **Avoid**: Negative price trend + negative news sentiment

## 🔍 Example Stock Tickers

Try these popular stocks to test the application:
- **AAPL** - Apple Inc.
- **TSLA** - Tesla Inc.
- **MSFT** - Microsoft Corporation
- **GOOGL** - Alphabet Inc.
- **AMZN** - Amazon.com Inc.
- **META** - Meta Platforms Inc.
- **NVDA** - NVIDIA Corporation
- **NFLX** - Netflix Inc.

## 🎨 Design Features

### Color Scheme
- **Primary Blue**: #3b82f6 (Interactive elements)
- **Success Green**: #16a34a (Positive indicators)
- **Error Red**: #dc2626 (Negative indicators)
- **Neutral Gray**: #6b7280 (Neutral indicators)

### Visual Elements
- Glassmorphism cards with backdrop blur
- Gradient backgrounds
- Smooth hover animations
- Responsive grid layouts
- Icon-based navigation

## 📊 Performance Features

- **Parallel API Calls**: Fetches all data simultaneously
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: Clear feedback during data fetching
- **Responsive Design**: Optimized for all screen sizes
- **TypeScript**: Type safety and better development experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for financial data APIs
- [NewsAPI](https://newsapi.org/) for news data
- [Recharts](https://recharts.org/) for chart components
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Verify your API keys are correctly configured
3. Ensure you're using a valid stock ticker symbol
4. Check your internet connection

---

**Note**: This application is for educational and informational purposes only. It should not be considered as financial advice. Always do your own research before making investment decisions. 