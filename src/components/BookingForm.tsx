import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';

interface BookingFormProps {
  onSubmit: (data: { passengerName: string; passengerPassport: string; passengerPhone: string; seatNumber: string }) => void;
  loading: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, loading }) => {
  const { user } = useAuthStore();
  
  const [passengerName, setPassengerName] = useState(user?.fullName || '');
  const [passengerPassport, setPassengerPassport] = useState(user?.passportNumber || '');
  const [passengerPhone, setPassengerPhone] = useState(user?.phone || '');
  const [seatNumber, setSeatNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ passengerName, passengerPassport, passengerPhone, seatNumber });
  };

  return (
    <div className="card" style={{ padding: '24px' }}>
      <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Passenger Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="passengerName">Full Name</label>
          <input
            id="passengerName"
            type="text"
            className="form-input"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="passengerPassport">Passport Number</label>
          <input
            id="passengerPassport"
            type="text"
            className="form-input"
            value={passengerPassport}
            onChange={(e) => setPassengerPassport(e.target.value)}
            required
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="passengerPhone">Phone Number</label>
            <input
              id="passengerPhone"
              type="text"
              className="form-input"
              value={passengerPhone}
              onChange={(e) => setPassengerPhone(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="seatNumber">Preferred Seat (Optional)</label>
            <input
              id="seatNumber"
              type="text"
              className="form-input"
              placeholder="e.g., 12A"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};
