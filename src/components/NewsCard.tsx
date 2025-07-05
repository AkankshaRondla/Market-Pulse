import React from 'react';
import { Newspaper, ExternalLink, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { NewsItem } from '../types/stock';
import { useTheme } from '../contexts/ThemeContext';

interface NewsCardProps {
  news: NewsItem[];
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const { isDarkMode } = useTheme();
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp size={16} />;
      case 'negative':
        return <ThumbsDown size={16} />;
      case 'neutral':
        return <Minus size={16} />;
      default:
        return <Minus size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNewsClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="card news-card" style={{ borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.06)', background: isDarkMode ? '#1e293b' : '#fff', padding: '2.5rem 2rem', width: '100%', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title" style={{ fontSize: '1.6rem', fontWeight: 700, color: isDarkMode ? '#f1f5f9' : '#1a202c', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <Newspaper className="card-icon" style={{ color: '#7f4fff', width: '1.5rem', height: '1.5rem' }} />
          Recent News & Sentiment
        </h2>
      </div>
      <div className="card-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {news.length === 0 ? (
          <div className="no-news" style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: isDarkMode ? '#94a3b8' : '#6b7280' }}>No recent news found for this stock.</p>
          </div>
        ) : (
          <div className="news-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {news.map((item, index) => (
              <div key={index} className="news-item" style={{ background: isDarkMode ? '#374151' : '#f9fafb', borderRadius: '1.2rem', padding: '1.1rem 1.2rem', boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="news-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <div className="news-source" style={{ color: isDarkMode ? '#94a3b8' : '#6b7280', fontSize: '0.98rem', fontWeight: 500 }}>
                    <span className="source-name">{item.source}</span>
                    <span className="news-date" style={{ marginLeft: '0.7rem', fontSize: '0.93rem', color: isDarkMode ? '#6b7280' : '#a1a1aa' }}>{formatDate(item.publishedAt)}</span>
                  </div>
                  <div className={`sentiment-badge ${getSentimentColor(item.sentiment)}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '1rem', fontWeight: 600, fontSize: '1rem', padding: '0.18rem 0.9rem', background: item.sentiment === 'positive' ? '#d1fae5' : item.sentiment === 'negative' ? '#fee2e2' : '#fef9c3', color: item.sentiment === 'positive' ? '#22c55e' : item.sentiment === 'negative' ? '#ef4444' : '#eab308' }}>
                    {getSentimentIcon(item.sentiment)}
                    <span className="sentiment-text">{item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}</span>
                  </div>
                </div>
                <h3 className="news-title" style={{ fontSize: '1.13rem', fontWeight: 700, color: isDarkMode ? '#f1f5f9' : '#1a202c', margin: 0 }}>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="news-link"
                    style={{ color: isDarkMode ? '#818cf8' : '#4f46e5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    {truncateText(item.title, 80)}
                    <ExternalLink className="external-link-icon" style={{ width: '1rem', height: '1rem', color: isDarkMode ? '#6b7280' : '#a1a1aa' }} />
                  </a>
                </h3>
                {item.description && (
                  <p className="news-description" style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '1rem', margin: 0 }}>
                    {truncateText(item.description, 120)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard; 