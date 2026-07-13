import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { flightsAPI } from '../api/client';
import { Flight } from '../types';
import { FlightCard } from '../components/FlightCard';
import { SearchForm } from '../components/SearchForm';
import { Loader2, SearchX } from 'lucide-react';

export const FlightsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = (query: any) => {
    navigate({
      pathname: '/flights',
      search: createSearchParams(query).toString()
    });
  };
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const date = searchParams.get('date') || '';
  const classType = searchParams.get('classType') || '';

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError('');
      try {
        const results = await flightsAPI.search({ origin, destination, departureDate: date, classType });
        setFlights(results);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch flights');
      } finally {
        setLoading(false);
      }
    };

    if (origin && destination) {
      fetchFlights();
    } else {
      setLoading(false);
    }
  }, [origin, destination, date, classType]);

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', padding: '40px 0', boxShadow: 'var(--shadow-sm)' }}>
        <div className="container">
          <SearchForm onSearch={handleSearch} initialValues={{ origin, destination, departureDate: date, classType: classType as any }} horizontal />
        </div>
      </div>
      
      <div className="container" style={{ padding: '40px 16px' }}>
        {!origin || !destination ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            <h2>Please enter search criteria to find flights.</h2>
          </div>
        ) : loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0', color: 'var(--primary-color)' }}>
            <Loader2 size={40} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '12px' }}>
            <p>{error}</p>
          </div>
        ) : flights.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <SearchX size={64} style={{ color: 'var(--border-color)' }} />
            </div>
            <h2>No flights found</h2>
            <p style={{ marginTop: '8px' }}>Try adjusting your search criteria or dates.</p>
          </div>
        ) : (
          <div>
            <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>
              Found {flights.length} flights from <span style={{ color: 'var(--primary-color)' }}>{origin}</span> to <span style={{ color: 'var(--primary-color)' }}>{destination}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {flights.map((flight) => (
                <FlightCard 
                  key={flight.id} 
                  flight={flight} 
                  onSelect={(id) => navigate(`/book/${id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
