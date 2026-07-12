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
    } finally {
      setLoading(false);
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length;
  const totalFlights = bookings.length;

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 24px 80px 24px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '8px' }}>
        Account <span className="text-gradient">Profile</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>
        Manage your personal information and view your travel statistics.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* Left Column: Avatar & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card animate-fade-up" style={{ padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 800, marginBottom: '20px', boxShadow: 'var(--shadow-md)' }}>
              {user?.fullName.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>{user?.fullName}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '24px' }}>{user?.email}</p>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', padding: '8px 16px', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 700 }}>
              <Shield size={16} /> Verified Account
            </div>
          </div>

          <div className="card animate-fade-up" style={{ animationDelay: '0.1s', padding: '32px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} style={{ color: 'var(--primary-color)' }} /> Travel Statistics
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: 500 }}>Active Bookings</span>
                <span className="text-gradient" style={{ fontSize: '1.75rem', fontWeight: 800 }}>{activeBookings}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: 500 }}>Total Flights</span>
                <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{totalFlights}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings Form */}
        <div className="card animate-fade-up" style={{ animationDelay: '0.2s', padding: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Settings size={24} style={{ color: 'var(--primary-color)' }} /> Personal Information
          </h3>

          {error && (
            <div className="animate-scale-in" style={{ padding: '16px', background: '#fef2f2', color: '#b91c1c', borderRadius: '12px', marginBottom: '24px', fontSize: '0.95rem', fontWeight: 500, border: '1px solid #fca5a5' }}>
              {error}
            </div>
          )}

          {success && (
            <div className="animate-scale-in" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', background: '#f0fdf4', color: '#15803d', borderRadius: '12px', marginBottom: '24px', fontSize: '0.95rem', fontWeight: 600, border: '1px solid #86efac' }}>
              <CheckCircle size={20} /> Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  id="fullName"
                  type="text"
                  required
                  className="form-input"
                  style={{ paddingLeft: '48px', fontSize: '1.05rem', paddingRight: '16px', paddingTop: '14px', paddingBottom: '14px' }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="passport">Passport Number (Optional)</label>
              <div style={{ position: 'relative' }}>
                <FileText size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  id="passport"
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '48px', fontSize: '1.05rem', paddingRight: '16px', paddingTop: '14px', paddingBottom: '14px' }}
                  placeholder="e.g. AB123456"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="phone">Phone Number (Optional)</label>
              <div style={{ position: 'relative' }}>
                <Phone size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  style={{ paddingLeft: '48px', fontSize: '1.05rem', paddingRight: '16px', paddingTop: '14px', paddingBottom: '14px' }}
                  placeholder="e.g. +380991234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ padding: '16px 40px', fontSize: '1.1rem' }}
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
