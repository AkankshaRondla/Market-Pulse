import React from 'react';
import { BarChart3 } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <header className="header" style={{ background: 'transparent', boxShadow: 'none', borderBottom: 'none', padding: '2.5rem 0 1.5rem 0' }}>
      <div className="header-content" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0', right: '2rem' }}>
          <DarkModeToggle />
        </div>
        <div className="logo" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 className="logo-icon" style={{ width: '3.5rem', height: '3.5rem', color: '#6C63FF', background: '#e0e7ff', borderRadius: '1rem', padding: '0.5rem', boxShadow: '0 2px 12px rgba(108,99,255,0.12)' }} />
          <h1 style={{ fontSize: '2.8rem', fontWeight: 700, color: isDarkMode ? '#f1f5f9' : '#1a202c', margin: 0 }}>Market Pulse</h1>
        </div>
        <div className="tagline" style={{ color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '1.25rem', fontWeight: 400, marginTop: '0.5rem' }}>
          Get real-time insights, news sentiment, and stock trends in one dashboard.
        </div>
      </div>
    </header>
  );
};

export default Header; 