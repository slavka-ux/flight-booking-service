import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { SearchForm } from '../components/SearchForm';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: any) => {
    navigate({
      pathname: '/flights',
      search: createSearchParams(query).toString()
    });
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>Find Your Next <span className="text-gradient">Adventure</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
            Search across hundreds of airlines and find the best prices for your journey.
          </p>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};
