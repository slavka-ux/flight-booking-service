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
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 72px - 200px)', padding: '60px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Find Your Next Flight</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Search across hundreds of airlines and find the best prices for your journey.
          </p>
        </div>
        
        <SearchForm onSearch={handleSearch} />
      </div>
    </div>
  );
};
