import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingsAPI } from '../api/client';
import { Booking } from '../types';
import { Loader2, Ticket, Calendar, MapPin, XCircle, CheckCircle, Plane } from 'lucide-react';

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
      await fetchBookings();
    } catch (err: any) {
      alert(err.message || 'Failed to cancel booking');
    } finally {
      setCancelLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Cancelled': return '#ef4444';
      default: return 'var(--text-secondary)';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--primary-color)' }}>
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 style={{ marginBottom: '40px', fontSize: '2.5rem', fontWeight: 800 }}>My <span className="text-gradient">Bookings</span></h1>

        {error ? (
          <div className="animate-scale-in" style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '20px', borderRadius: '12px', border: '1px solid #fca5a5', fontWeight: 600 }}>
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="card animate-fade-up" style={{ padding: '80px 20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--bg-tertiary), var(--border-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <Ticket size={40} />
              </div>
            </div>
            <h2 style={{ marginBottom: '16px', fontSize: '1.75rem', fontWeight: 800 }}>No Bookings Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem' }}>You haven't made any flight bookings yet.</p>
            <Link to="/search" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', padding: '16px 40px', fontSize: '1.1rem' }}>
              Find Your First Flight
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {bookings.map((booking, i) => (
              <div key={booking.id} className="card animate-fade-up" style={{ animationDelay: `${0.1 * i}s`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '20px 32px', backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Booking Reference</span>
                    <p style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '1.25rem', color: 'var(--primary-color)' }}>{booking.id.toUpperCase().substring(0, 10)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      padding: '6px 16px', 
                      borderRadius: '999px', 
                      fontSize: '0.9rem', 
                      fontWeight: 700,
                      backgroundColor: `${getStatusColor(booking.status)}15`,
                      color: getStatusColor(booking.status),
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: `1px solid ${getStatusColor(booking.status)}30`
                    }}>
                      {booking.status === 'Confirmed' && <CheckCircle size={16} />}
                      {booking.status === 'Cancelled' && <XCircle size={16} />}
                      {booking.status}
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: '32px', display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--primary-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', fontWeight: 800, fontSize: '1.2rem' }}>
                        {booking.flight.airline.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{booking.flight.airline}</p>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Flight {booking.flight.flightNumber}</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1 }}>{booking.flight.departureTime}</p>
                        <p style={{ fontWeight: 700, color: 'var(--primary-color)', marginTop: '8px' }}>{booking.flight.origin}</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{booking.flight.originName}</p>
                      </div>
                      
                      <div style={{ flex: 1, padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>{booking.flight.duration}</p>
                        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border-color)', position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '0 12px', color: 'var(--primary-color)' }}>
                            <Plane size={20} style={{ transform: 'rotate(90deg)' }} />
                          </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', fontWeight: 600 }}>
                          {booking.flight.stops === 0 ? 'Direct Flight' : `${booking.flight.stops} Stop${booking.flight.stops > 1 ? 's' : ''}`}
                        </p>
                      </div>
                      
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        <p style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1 }}>{booking.flight.arrivalTime}</p>
                        <p style={{ fontWeight: 700, color: 'var(--primary-color)', marginTop: '8px' }}>{booking.flight.destination}</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{booking.flight.destinationName}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ flex: '1 1 250px', borderLeft: '1px solid var(--border-color)', paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '4px' }}>
                        <Calendar size={18} style={{ color: 'var(--primary-color)' }} /> Date Booked
                      </p>
                      <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{new Date(booking.bookingDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    
                    <div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '4px' }}>
                        <MapPin size={18} style={{ color: 'var(--primary-color)' }} /> Passenger
                      </p>
                      <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{booking.passengerName}</p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Seat: <span style={{ fontWeight: 600 }}>{booking.seatNumber || 'Not assigned'}</span></p>
                    </div>
                    
                    {booking.status !== 'Cancelled' && (
                      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                        <button 
                          onClick={() => handleCancel(booking.id)}
                          className="btn" 
                          style={{ width: '100%', backgroundColor: 'transparent', color: '#dc2626', border: '1px solid #fca5a5', fontWeight: 600, padding: '12px' }}
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
