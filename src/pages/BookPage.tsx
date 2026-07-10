import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flightsAPI, bookingsAPI } from '../api/client';
import { Flight } from '../types';
import { BookingForm } from '../components/BookingForm';
import { FlightCard } from '../components/FlightCard';
import { Loader2, ArrowLeft } from 'lucide-react';

export const BookPage: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();
  
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        if (!flightId) throw new Error("Invalid flight ID");
        const data = await flightsAPI.getById(flightId);
        setFlight(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load flight details');
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  const handleBookingSubmit = async (data: { passengerName: string; passengerPassport: string; passengerPhone: string; seatNumber: string }) => {
    if (!flightId) return;
    setBookingLoading(true);
    setError('');
    
    try {
      await bookingsAPI.create({
        flightId,
        ...data
      });
      navigate('/bookings');
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0', color: 'var(--primary-color)' }}>
        <Loader2 size={40} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (error && !flight) {
    return (
      <div className="container" style={{ padding: '60px 16px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '24px', borderRadius: '12px', display: 'inline-block' }}>
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="btn btn-primary" style={{ marginTop: '16px' }}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 72px - 200px)', padding: '40px 0' }}>
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px', fontSize: '1rem' }}
        >
          <ArrowLeft size={20} /> Back to Search
        </button>
        
        <h1 style={{ marginBottom: '32px', fontSize: '2rem' }}>Complete Your Booking</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {/* Using CSS grid for layout, on large screens it could be 2 columns but inline styles keep it simple here */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-color)' }}>Selected Flight</h2>
              {flight && <FlightCard flight={flight} />}
            </div>
            
            {error && (
              <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '8px' }}>
                {error}
              </div>
            )}
            
            <BookingForm onSubmit={handleBookingSubmit} loading={bookingLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
