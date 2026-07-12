import React from 'react';
import { Flight } from '../types';
import { Plane, Armchair, Clock } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  onSelect?: (flightId: string) => void;
  showSelectButton?: boolean;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect, showSelectButton = true }) => {
  const getBadgeStyle = (cls: string) => {
    switch (cls) {
      case 'First': return { background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary-color)' };
      case 'Business': return { background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)' };
      default: return { background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-color)' };
    }
  };

  return (
    <div className="card animate-fade-up" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plane size={28} style={{ transform: 'rotate(45deg)', strokeWidth: 1.5 }} />
          </div>
          <div>
            <h4 style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{flight.airline}</h4>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Flight {flight.flightNumber}</span>
          </div>
        </div>
        <div>
          <span style={{ ...getBadgeStyle(flight.classType), display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700 }}>
            <Armchair size={14} /> {flight.classType}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', margin: '20px 0' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{flight.departureTime}</p>
          <p style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: '1.1rem', marginTop: '8px' }}>{flight.origin}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{flight.originName}</p>
        </div>
        
        <div style={{ flex: 1, padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}><Clock size={14} /> {flight.duration}</p>
          <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border-color)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '0 16px', color: 'var(--primary-hover)' }}>
              <Plane size={20} style={{ transform: 'rotate(90deg)' }} />
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '12px', fontWeight: 600 }}>
            {flight.stops === 0 ? 'Direct Flight' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
          </p>
        </div>
        
        <div style={{ flex: 1, textAlign: 'right' }}>
          <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>{flight.arrivalTime}</p>
          <p style={{ fontWeight: 700, color: 'var(--primary-color)', fontSize: '1.1rem', marginTop: '8px' }}>{flight.destination}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{flight.destinationName}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '24px', marginTop: '8px' }}>
        <div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 500 }}>Price per passenger</span>
          <div className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>${flight.price}</div>
        </div>
        {showSelectButton && onSelect && (
          <button onClick={() => onSelect(flight.id)} className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.15rem' }}>
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};
