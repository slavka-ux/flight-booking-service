import React from 'react';
import { Flight } from '../types';
import { Plane, Armchair } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  onSelect?: (flightId: string) => void;
  showSelectButton?: boolean;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect, showSelectButton = true }) => {
  const getBadgeStyle = (cls: string) => {
    switch (cls) {
      case 'First': return { background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)' };
      case 'Business': return { background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(6, 182, 212, 0.2)' };
      default: return { background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(99, 102, 241, 0.2)' };
    }
  };

  return (
    <div className="glow-card animate-fade-in">
      <div className="flight-card-inner">
        <div className="flight-airline-info">
          <div className="airline-icon"><Plane size={24} style={{ strokeWidth: 1.5 }} /></div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{flight.airline}</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{flight.flightNumber}</span>
            <div style={{ marginTop: '4px' }}>
              <span className="badge" style={getBadgeStyle(flight.classType)}>
                <Armchair size={10} /> {flight.classType}
              </span>
            </div>
          </div>
        </div>

        <div className="flight-timeline">
          <div className="timeline-point">
            <span className="timeline-time">{flight.departureTime}</span>
            <div className="timeline-code">{flight.origin}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{flight.originName}</div>
          </div>
          <div className="timeline-path">
            <span className="path-duration">{flight.duration}</span>
            <div className="path-line"></div>
            <span className="path-stops">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
          </div>
          <div className="timeline-point">
            <span className="timeline-time">{flight.arrivalTime}</span>
            <div className="timeline-code">{flight.destination}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{flight.destinationName}</div>
          </div>
        </div>

        <div className="flight-pricing">
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Price per passenger</span>
            <div className="price-tag">${flight.price}</div>
          </div>
          {showSelectButton && onSelect && (
            <button onClick={() => onSelect(flight.id)} className="btn-primary" style={{ width: '100%', padding: '10px' }}>
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
