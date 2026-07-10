import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingsAPI } from '../api/client';
import { Booking } from '../types';
import { Loader2, Ticket, Calendar, Clock, MapPin, XCircle, CheckCircle } from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingsAPI.getAll();
      // Sort bookings by date descending (newest first)
      setBookings(data.sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()));
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return;
    }
    
    setCancelLoading(bookingId);
    try {
      await bookingsAPI.cancel(bookingId);
      await fetchBookings(); // Refresh list
    } catch (err: any) {
      alert(err.message || 'Failed to cancel booking');
    } finally {
      setCancelLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#10b981'; // green
      case 'Pending': return '#f59e0b'; // yellow
      case 'Cancelled': return '#ef4444'; // red
      default: return 'var(--text-secondary)';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0', color: 'var(--primary-color)' }}>
        <Loader2 size={40} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 72px - 200px)', padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '32px', fontSize: '2rem' }}>My Bookings</h1>

        {error ? (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '8px' }}>
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <Ticket size={32} />
              </div>
            </div>
            <h2 style={{ marginBottom: '12px', fontSize: '1.5rem' }}>No Bookings Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>You haven't made any flight bookings yet.</p>
            <Link to="/search" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Search Flights
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {bookings.map((booking) => (
              <div key={booking.id} className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Booking Reference</span>
                    <p style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '1.1rem' }}>{booking.id.toUpperCase().substring(0, 10)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.85rem', 
                      fontWeight: 600,
                      backgroundColor: `${getStatusColor(booking.status)}15`,
                      color: getStatusColor(booking.status),
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {booking.status === 'Confirmed' && <CheckCircle size={14} />}
                      {booking.status === 'Cancelled' && <XCircle size={14} />}
                      {booking.status}
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                        {booking.flight.airline.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600 }}>{booking.flight.airline}</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Flight {booking.flight.flightNumber}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{booking.flight.departureTime}</p>
                        <p style={{ fontWeight: 500 }}>{booking.flight.origin}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{booking.flight.originName}</p>
                      </div>
                      
                      <div style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{booking.flight.duration}</p>
                        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border-color)', position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '0 8px', color: 'var(--primary-color)' }}>
                            ✈
                          </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          {booking.flight.stops === 0 ? 'Direct' : `${booking.flight.stops} Stop${booking.flight.stops > 1 ? 's' : ''}`}
                        </p>
                      </div>
                      
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{booking.flight.arrivalTime}</p>
                        <p style={{ fontWeight: 500 }}>{booking.flight.destination}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{booking.flight.destinationName}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ flex: '1 1 200px', borderLeft: '1px solid var(--border-color)', paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} /> Date Booked
                      </p>
                      <p style={{ fontWeight: 500 }}>{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={16} /> Passenger
                      </p>
                      <p style={{ fontWeight: 500 }}>{booking.passengerName}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Seat: {booking.seatNumber || 'Not assigned'}</p>
                    </div>
                    
                    {booking.status !== 'Cancelled' && (
                      <div style={{ marginTop: 'auto' }}>
                        <button 
                          onClick={() => handleCancel(booking.id)}
                          className="btn" 
                          style={{ width: '100%', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444' }}
                          disabled={cancelLoading === booking.id}
                        >
                          {cancelLoading === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
