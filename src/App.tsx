import React from 'react';
import './App.css';
import StockAnalyzer from './components/StockAnalyzer';
import Header from './components/Header';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main className="main-content">
          <StockAnalyzer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
