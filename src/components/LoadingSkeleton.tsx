import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SkeletonProps {
  type: 'card' | 'chart' | 'news';
}

const LoadingSkeleton: React.FC<SkeletonProps> = ({ type }) => {
  const { isDarkMode } = useTheme();

  const skeletonStyle = {
    background: isDarkMode ? '#374151' : '#f3f4f6',
    borderRadius: '0.5rem',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  };

  const renderCardSkeleton = () => (
    <div style={{ 
      background: isDarkMode ? '#1e293b' : '#fff', 
      borderRadius: '2rem', 
      padding: '2.5rem 2rem',
      boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem' }}>
        <div style={{ ...skeletonStyle, width: '1.5rem', height: '1.5rem' }} />
        <div style={{ ...skeletonStyle, width: '200px', height: '1.6rem' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ ...skeletonStyle, width: '100%', height: '3rem' }} />
        <div style={{ ...skeletonStyle, width: '80%', height: '2rem' }} />
        <div style={{ ...skeletonStyle, width: '60%', height: '2rem' }} />
      </div>
    </div>
  );

  const renderChartSkeleton = () => (
    <div style={{ 
      background: isDarkMode ? '#1e293b' : '#fff', 
      borderRadius: '2rem', 
      padding: '2.5rem 2rem',
      boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem' }}>
        <div style={{ ...skeletonStyle, width: '1.5rem', height: '1.5rem' }} />
        <div style={{ ...skeletonStyle, width: '250px', height: '1.6rem' }} />
      </div>
      <div style={{ ...skeletonStyle, width: '100%', height: '400px', borderRadius: '1rem' }} />
    </div>
  );

  const renderNewsSkeleton = () => (
    <div style={{ 
      background: isDarkMode ? '#1e293b' : '#fff', 
      borderRadius: '2rem', 
      padding: '2.5rem 2rem',
      boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem' }}>
        <div style={{ ...skeletonStyle, width: '1.5rem', height: '1.5rem' }} />
        <div style={{ ...skeletonStyle, width: '300px', height: '1.6rem' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ 
            background: isDarkMode ? '#374151' : '#f9fafb', 
            borderRadius: '1.2rem', 
            padding: '1.1rem 1.2rem' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ ...skeletonStyle, width: '120px', height: '1rem' }} />
              <div style={{ ...skeletonStyle, width: '80px', height: '1rem' }} />
            </div>
            <div style={{ ...skeletonStyle, width: '100%', height: '1.2rem', marginBottom: '0.5rem' }} />
            <div style={{ ...skeletonStyle, width: '80%', height: '1rem' }} />
          </div>
        ))}
      </div>
    </div>
  );

  switch (type) {
    case 'chart':
      return renderChartSkeleton();
    case 'news':
      return renderNewsSkeleton();
    default:
      return renderCardSkeleton();
  }
};

export default LoadingSkeleton; 