import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plane, Shield, Zap, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px' }}>
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.15)', borderRadius: '9999px', color: 'var(--accent-primary)', marginBottom: '24px', fontSize: '0.875rem', fontWeight: 600 }}>
          <Sparkles size={14} />
          <span>Experience Next-Gen Booking</span>
        </div>
        
        <h1 className="hero-title">
          Discover the Skies.<br />
          <span className="text-gradient">Redefine Travel.</span>
        </h1>
        
        <p className="hero-subtitle">
          Search, checkout, and manage your flight schedules with AeroGlide's next-generation flight booking client. Optimized for individual traveler flow.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/search')} className="btn-primary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
            Search Flights <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/register')} className="btn-secondary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>
            Create Account
          </button>
        </div>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center', marginBottom: '12px' }}>Why Fly With AeroGlide?</h3>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' }}>
          We offer more than just reservations. Enjoy custom seat layout maps, direct cabin class pricing, and immediate client-side booking controls.
        </p>

        <div className="features-grid">
          <div className="glow-card feature-item">
            <div className="feature-icon-wrapper"><Zap size={24} /></div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px' }}>Instant Confirmations</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Receive instant booking certificates and seats. Our mock checkout flow completes reservations in real-time, syncing immediately to your account profile.
            </p>
          </div>

          <div className="glow-card feature-item">
            <div className="feature-icon-wrapper"><Plane size={24} /></div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px' }}>Luxury Cabin Classes</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Compare rates across Economy, Business, or First Class cabins. Select custom seats in premium, spacious deck options with real-time status cues.
            </p>
          </div>

          <div className="glow-card feature-item">
            <div className="feature-icon-wrapper"><Shield size={24} /></div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px' }}>Full Booking Control</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Access full flight control inside your custom dashboard. Modify passenger listings, cancel upcoming journeys, or adjust details directly from your dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
