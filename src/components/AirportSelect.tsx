import React, { useState, useRef, useEffect } from 'react';
import { AIRPORTS } from '../data/airports';
import { Search, MapPin } from 'lucide-react';

interface AirportSelectProps {
  value: string;
  onChange: (code: string) => void;
  label: React.ReactNode;
  id: string;
  horizontal?: boolean;
}

export const AirportSelect: React.FC<AirportSelectProps> = ({ value, onChange, label, id, horizontal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedAirport = AIRPORTS.find(a => a.code === value);

  useEffect(() => {
    if (selectedAirport) {
      setSearch(`${selectedAirport.city} (${selectedAirport.code})`);
    } else {
      setSearch('');
    }
  }, [value, selectedAirport]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (selectedAirport) {
          setSearch(`${selectedAirport.city} (${selectedAirport.code})`);
        } else {
          setSearch('');
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedAirport]);

  const filteredAirports = AIRPORTS.filter(a => {
    const term = search.toLowerCase();
    return a.city.toLowerCase().includes(term) || 
           a.country.toLowerCase().includes(term) || 
           a.name.toLowerCase().includes(term) || 
           a.code.toLowerCase().includes(term);
  }).slice(0, 15);

  return (
    <div className="form-group" style={{ flex: 1, marginBottom: horizontal ? 0 : '20px', position: 'relative' }} ref={wrapperRef}>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type="text"
          className="form-input"
          style={{ fontSize: '1.05rem', padding: '14px 16px', paddingRight: '40px' }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setSearch('');
            setIsOpen(true);
          }}
          placeholder="Search city or airport..."
          autoComplete="off"
        />
        <Search size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, 
          background: 'var(--bg-primary)', 
          border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-md)', 
          boxShadow: 'var(--shadow-lg)', 
          marginTop: '8px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {filteredAirports.length === 0 ? (
            <div style={{ padding: '16px', color: 'var(--text-secondary)', textAlign: 'center' }}>No airports found</div>
          ) : (
            filteredAirports.map(airport => (
              <div 
                key={airport.code} 
                onClick={() => {
                  onChange(airport.code);
                  setIsOpen(false);
                }}
                style={{
                  padding: '12px 16px', 
                  cursor: 'pointer', 
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ background: 'var(--primary-light)', color: 'var(--primary-color)', padding: '8px', borderRadius: '8px' }}>
                  <MapPin size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{airport.city}, {airport.country}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{airport.name}</div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--primary-color)', background: 'var(--primary-light)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  {airport.code}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
