import React, { useState } from 'react';
import { SearchQuery } from '../types';
import { PlaneTakeoff, PlaneLanding, Calendar, Award, User } from 'lucide-react';

interface SearchFormProps {
  initialValues?: SearchQuery;
  onSearch: (query: SearchQuery) => void;
}

const AIRPORTS = [
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'JFK', name: 'New York JFK' },
  { code: 'CDG', name: 'Paris Charles de Gaulle' },
  { code: 'NRT', name: 'Tokyo Narita' },
  { code: 'KBP', name: 'Kyiv Boryspil' },
  { code: 'DXB', name: 'Dubai International' }
];

export const SearchForm: React.FC<SearchFormProps> = ({ initialValues, onSearch }) => {
  const [origin, setOrigin] = useState(initialValues?.origin || 'LHR');
  const [destination, setDestination] = useState(initialValues?.destination || 'JFK');
  const [departureDate, setDepartureDate] = useState(initialValues?.departureDate || new Date().toISOString().split('T')[0]);
  const [classType, setClassType] = useState<SearchQuery['classType']>(initialValues?.classType || 'Economy');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin === destination) {
      setError('Origin and destination cannot be the same airport.');
      return;
    }
    setError(null);
    onSearch({ origin, destination, departureDate, classType });
  };

  return (
    <form onSubmit={handleSubmit} className="glow-card" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '4px' }}>Search Flights</h2>
        
        <div className="search-form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="origin">
              <PlaneTakeoff size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
              From
            </label>
            <select id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} className="form-input form-select">
              {AIRPORTS.map((ap) => (
                <option key={ap.code} value={ap.code} style={{ background: '#0d1224' }}>{ap.name} ({ap.code})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="destination">
              <PlaneLanding size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
              To
            </label>
            <select id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="form-input form-select">
              {AIRPORTS.map((ap) => (
                <option key={ap.code} value={ap.code} style={{ background: '#0d1224' }}>{ap.name} ({ap.code})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="departureDate">
              <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Departure Date
            </label>
            <input id="departureDate" type="date" value={departureDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDepartureDate(e.target.value)} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="classType">
              <Award size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
              Cabin Class
            </label>
            <select id="classType" value={classType} onChange={(e) => setClassType(e.target.value as SearchQuery['classType'])} className="form-input form-select">
              <option value="Economy" style={{ background: '#0d1224' }}>Economy</option>
              <option value="Business" style={{ background: '#0d1224' }}>Business</option>
              <option value="First" style={{ background: '#0d1224' }}>First Class</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <User size={16} style={{ color: 'var(--accent-primary)' }} />
            <span>Passengers: <strong>1 Adult</strong> <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', marginLeft: '4px', background: 'rgba(6, 182, 212, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>Single Passenger Flow</span></span>
          </div>
          {error && <div style={{ color: 'var(--accent-danger)', fontSize: '0.875rem', fontWeight: 500 }}>{error}</div>}
          <button type="submit" className="btn-primary" style={{ minWidth: '160px' }}>Search Flights</button>
        </div>
      </div>
    </form>
  );
};
