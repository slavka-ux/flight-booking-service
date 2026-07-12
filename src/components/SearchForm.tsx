import React, { useState } from 'react';
import { SearchQuery } from '../types';
import { PlaneTakeoff, PlaneLanding, Calendar, Award, User, Search } from 'lucide-react';
import { AirportSelect } from './AirportSelect';

interface SearchFormProps {
  initialValues?: SearchQuery;
  onSearch: (query: SearchQuery) => void;
  horizontal?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ initialValues, onSearch, horizontal = false }) => {
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
    <form onSubmit={handleSubmit} className={horizontal ? "" : "card animate-fade-up"} style={{ padding: horizontal ? '0' : '40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {!horizontal && (
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>Find Your Flight</h2>
        )}
        
        <div className={horizontal ? "search-form-horizontal" : ""} style={{ display: horizontal ? 'flex' : 'grid', gridTemplateColumns: horizontal ? 'none' : '1fr 1fr', gap: '24px' }}>
          
          <AirportSelect 
            id="origin"
            label={<><PlaneTakeoff size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-color)' }} /> From</>}
            value={origin}
            onChange={setOrigin}
            horizontal={horizontal}
          />

          <AirportSelect 
            id="destination"
            label={<><PlaneLanding size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-color)' }} /> To</>}
            value={destination}
            onChange={setDestination}
            horizontal={horizontal}
          />

          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="form-label" htmlFor="departureDate">
              <Calendar size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-color)' }} />
              Date
            </label>
            <input id="departureDate" type="date" value={departureDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDepartureDate(e.target.value)} className="form-input" style={{ fontSize: '1.05rem', padding: '14px 16px' }} />
          </div>

          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="form-label" htmlFor="classType">
              <Award size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom', color: 'var(--primary-color)' }} />
              Class
            </label>
            <select id="classType" value={classType} onChange={(e) => setClassType(e.target.value as SearchQuery['classType'])} className="form-input" style={{ fontSize: '1.05rem', padding: '14px 16px' }}>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First Class</option>
            </select>
          </div>

          {horizontal && (
             <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'flex-end' }}>
               <button type="submit" className="btn btn-primary" style={{ height: '54px', padding: '0 32px', fontSize: '1.1rem' }}>
                 <Search size={20} /> Search
               </button>
             </div>
          )}
        </div>

        {error && <div className="animate-scale-in" style={{ color: '#ef4444', fontSize: '1rem', fontWeight: 600, background: '#fef2f2', padding: '16px', borderRadius: '12px', border: '1px solid #fca5a5' }}>{error}</div>}

        {!horizontal && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '32px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '1rem' }}>
              <User size={20} style={{ color: 'var(--primary-color)' }} />
              <span>Passengers: <strong>1 Adult</strong></span>
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.15rem' }}>
              <Search size={20} /> Search Flights
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
