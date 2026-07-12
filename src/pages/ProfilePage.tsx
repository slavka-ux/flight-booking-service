import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { bookingsAPI } from '../api/client';
import { Booking } from '../types';
import { User, Phone, FileText, Settings, Shield, Award, CheckCircle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, error, clearError } = useAuthStore();
  
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [passportNumber, setPassportNumber] = useState(user?.passportNumber || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    clearError();
    const fetchStats = async () => {
      try {
        const data = await bookingsAPI.getAll();
        setBookings(data);
      } catch (err) {
        // Handle error silently for stats
      }
    };
    fetchStats();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setLoading(true);
    setSuccess(false);
    try {
      await updateProfile(fullName, passportNumber.toUpperCase(), phone);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      // Error is handled by the store
    } finally {
      setLoading(false);
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length;
  const totalFlights = bookings.length;

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px 80px 24px' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '8px' }}>
        Account <span className="text-gradient">Profile</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
        Manage your personal information and view your travel statistics.
      </p>

      <div className="profile-grid">
        {/* Left Column: Avatar & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glow-card profile-avatar-card">
            <div className="profile-avatar">
              {user?.fullName.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '4px' }}>{user?.fullName}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>{user?.email}</p>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', padding: '6px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
              <Shield size={14} />
              Verified Account
            </div>
          </div>

          <div className="glow-card" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} style={{ color: 'var(--accent-primary)' }} />
              Travel Statistics
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Active Bookings</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeBookings}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Flights</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{totalFlights}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Form */}
        <div className="glow-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={20} style={{ color: 'var(--accent-primary)' }} />
            Personal Information
          </h3>

          {error && (
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', borderRadius: '8px', marginBottom: '24px', fontSize: '0.875rem' }}>
              <CheckCircle size={18} />
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  id="fullName"
                  type="text"
                  required
                  className="form-input"
                  style={{ paddingLeft: '48px', width: '100%' }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="passport">Passport Number (Optional)</label>
              <div style={{ position: 'relative' }}>
                <FileText size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  id="passport"
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '48px', width: '100%' }}
                  placeholder="e.g. AB123456"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                This will be automatically filled when booking a flight.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number (Optional)</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  style={{ paddingLeft: '48px', width: '100%' }}
                  placeholder="e.g. +380991234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ padding: '12px 32px' }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
