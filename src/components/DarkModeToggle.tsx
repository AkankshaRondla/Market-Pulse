import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-toggle"
      style={{
        background: isDarkMode ? '#1f2937' : '#f3f4f6',
        border: '2px solid',
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
        borderRadius: '50px',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: isDarkMode 
          ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '48px',
        height: '48px',
        position: 'relative',
        overflow: 'hidden'
      }}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${isDarkMode ? '180deg' : '0deg'})`,
          transition: 'transform 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isDarkMode ? (
          <Moon 
            size={20} 
            color="#fbbf24" 
            style={{ transition: 'all 0.3s ease' }}
          />
        ) : (
          <Sun 
            size={20} 
            color="#f59e0b" 
            style={{ transition: 'all 0.3s ease' }}
          />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle; 