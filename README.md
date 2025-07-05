Market Pulse - Real-Time Stock Analysis Dashboard

A modern, feature-rich stock market analysis application that provides real-time insights, news sentiment analysis, and AI-powered price predictions in a beautiful, responsive dashboard.

![image](https://github.com/user-attachments/assets/c741fc92-f9c6-4caf-8365-39dc843aefdb)


 Features

# Real-Time Stock Data
- Live stock prices and market data
- Historical price charts (30-day view)
- Volume analysis and price trends
- Real-time price changes and percentages

![image](https://github.com/user-attachments/assets/5ae988bc-7262-4a69-a4b7-59a871eb3add)


# AI-Powered Price Predictions
- Machine Learning price predictions for 1 day, 1 week, and 1 month
- Confidence levels and risk assessments
- Trend analysis (bullish/bearish/neutral)
- Key factors influencing predictions

  ![image](https://github.com/user-attachments/assets/75c8de5c-4643-4b08-9dc2-143d890b73e1)


# News Sentiment Analysis
- Real-time news aggregation
- AI-powered sentiment analysis (positive/negative/neutral)
- News source tracking and timestamps
- Sentiment-based stock health indicators

  ![image](https://github.com/user-attachments/assets/ab6c8975-338b-46de-886b-42aa07b534e0)


# Stock Health Indicators
- Comprehensive health scoring system
- Price trend analysis
- Volume activity monitoring
- News sentiment impact
- Interactive status buttons (Buy/Watch/Avoid)

  ![image](https://github.com/user-attachments/assets/57aded8c-889c-4461-aa27-cf7cc8305e96)

# Dark Mode Support
- Beautiful dark/light theme toggle
- Persistent user preferences
- Smooth theme transitions
- Optimized for all lighting conditions

  ![image](https://github.com/user-attachments/assets/5268a364-897e-4f4f-b67d-25d8e4cda34b)

  ![image](https://github.com/user-attachments/assets/53f6bdf1-5c49-4ee3-9172-d0f3ed53850b)

  ![image](https://github.com/user-attachments/assets/84068a41-d83e-40f4-934a-b7c51b768d42)

  ![image](https://github.com/user-attachments/assets/7797192f-1936-4105-91fc-a8a3bd7753b4)




# Responsive Design
- Mobile-first responsive layout
- Optimized for all screen sizes
- Touch-friendly interface
- Modern glassmorphism design

# Technology Stack

- Frontend: React 18 + TypeScript
- Styling: CSS3 with modern design patterns
- Icons: Lucide React
- Charts: Recharts
- APIs: Alpha Vantage (stock data), NewsAPI (news)
- State Management: React Context API
- Build Tool: Create React App

# Getting Started

# Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

# Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd market-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
   REACT_APP_NEWS_API_KEY=your_news_api_key
   REACT_APP_ALPHA_VANTAGE_BASE_URL=https://www.alphavantage.co/query
   REACT_APP_NEWS_API_BASE_URL=https://newsapi.org/v2
   ```

4. **Get API Keys**
   - **Alpha Vantage**: Sign up at [alphavantage.co](https://www.alphavantage.co/support/#api-key) (free tier available)
   - **NewsAPI**: Sign up at [newsapi.org](https://newsapi.org/register) (free tier available)

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

# How to Use

# Searching for Stocks
1. Enter a stock ticker symbol (e.g., AAPL, TSLA, GOOGL)
2. Click "Search" or press Enter
3. View comprehensive analysis results

# Understanding the Dashboard

# Stock Information Card
- Current price and 24h change
- High/low prices and volume
- Price trend indicators

# Stock Health Indicator
- Overall health score with confidence level
- Interactive status button (Buy/Watch/Avoid)
- Detailed metrics breakdown

#### **ML Price Prediction**
- AI-powered price forecasts
- Multiple timeframes (1 day, 1 week, 1 month)
- Confidence levels and risk assessments
- Key influencing factors

# Price History Chart
- Interactive 30-day price chart
- Hover tooltips with detailed information
- Responsive design

# News & Sentiment
- Latest news articles
- Sentiment analysis for each article
- Direct links to full articles

### 🌙 **Dark Mode**
- Click the sun/moon icon in the top-right corner
- Theme preference is automatically saved
- Smooth transitions between themes

# Project Structure

```
market-pulse/
├── src/
│   ├── components/
│   │   ├── ChartCard.tsx          # Price history charts
│   │   ├── DarkModeToggle.tsx     # Theme toggle component
│   │   ├── Header.tsx             # App header
│   │   ├── HealthIndicator.tsx    # Stock health analysis
│   │   ├── NewsCard.tsx           # News and sentiment
│   │   ├── PricePrediction.tsx    # ML price predictions
│   │   ├── StockAnalyzer.tsx      # Main dashboard
│   │   └── StockCard.tsx          # Stock information
│   ├── contexts/
│   │   └── ThemeContext.tsx       # Dark mode context
│   ├── services/
│   │   └── api.ts                 # API integration
│   ├── types/
│   │   └── stock.ts               # TypeScript interfaces
│   ├── App.tsx                    # Main app component
│   ├── App.css                    # Global styles
│   └── index.tsx                  # App entry point
├── public/                        # Static assets
├── .env                           # Environment variables
└── package.json                   # Dependencies
```

# Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

# Key Features Explained

# ML Price Predictions
The app uses a sophisticated algorithm that analyzes:
- Historical price patterns
- Volatility calculations
- Trend analysis
- Market sentiment correlation

# Sentiment Analysis
News articles are analyzed for:
- Positive/negative keywords
- Market impact assessment
- Sentiment scoring
- Trend correlation

# Stock Health Scoring
Comprehensive health assessment based on:
- Price momentum
- Volume analysis
- News sentiment
- Technical indicators

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for stock market data
- [NewsAPI](https://newsapi.org/) for news aggregation
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Recharts](https://recharts.org/) for chart components

# Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation above
- Ensure your API keys are properly configured

---

**Built with ❤️ using React and TypeScript**
