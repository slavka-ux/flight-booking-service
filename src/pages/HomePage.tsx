import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plane, Shield, Zap, Sparkles, MapPin } from 'lucide-react';
import { SearchForm } from '../components/SearchForm';

const DESTINATIONS = [
  { id: 'd1', code: 'CDG', city: 'Paris', country: 'France', image: 'images/paris.png', tag: 'Romantic' },
  { id: 'd2', code: 'NRT', city: 'Tokyo', country: 'Japan', image: 'images/tokyo.png', tag: 'Culture' },
  { id: 'd3', code: 'JFK', city: 'New York', country: 'USA', image: 'images/new_york.png', tag: 'Vibrant' },
  { id: 'd4', code: 'DXB', city: 'Dubai', country: 'UAE', image: 'images/dubai.png', tag: 'Luxury' }
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: any) => {
    navigate(`/flights?origin=${query.origin}&destination=${query.destination}&date=${query.departureDate}&classType=${query.classType}`);
  };

  const getUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section 
        style={{ 
          position: 'relative', 
          minHeight: '85vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '80px 20px',
          backgroundImage: `url("${getUrl('images/hero_bg.png')}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.8) 100%)', zIndex: 1 }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', width: '100%' }}>
          <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '9999px', color: 'white', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 600 }}>
            <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
            <span>Experience Next-Gen Booking</span>
          </div>
          
          <h1 className="animate-fade-up" style={{ animationDelay: '0.1s', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: 'white', marginBottom: '1.5rem', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Discover the Skies.<br />
            <span style={{ color: 'var(--accent-cyan)' }}>Redefine Travel.</span>
          </h1>
          
          <p className="animate-fade-up" style={{ animationDelay: '0.2s', fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            Search, checkout, and manage your flight schedules with AeroGlide's premium next-generation client.
          </p>
          
          {/* Floating Search Form */}
          <div className="animate-fade-up glass-card" style={{ animationDelay: '0.3s', padding: '16px', borderRadius: 'var(--radius-xl)' }}>
            <SearchForm onSearch={handleSearch} horizontal />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container" style={{ marginTop: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Popular Destinations</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '8px' }}>Explore the world's most breathtaking cities.</p>
          </div>
          <button onClick={() => navigate('/search')} className="btn btn-secondary" style={{ display: 'none' }}>View All <ArrowRight size={18} /></button>
        </div>

        <div className="destinations-grid">
          {DESTINATIONS.map((dest, i) => (
            <div key={dest.id} className="destination-card animate-fade-up" style={{ animationDelay: `${0.1 * i}s` }} onClick={() => navigate(`/flights?destination=${dest.code}`)}>
              <img src={getUrl(dest.image)} alt={dest.city} className="destination-img" />
              <div className="destination-overlay">
                <span style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--primary-color)', color: 'white', fontSize: '0.75rem', fontWeight: 700, borderRadius: '4px', marginBottom: '12px' }}>{dest.tag}</span>
                <h3 className="destination-title">{dest.city}</h3>
                <p className="destination-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {dest.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container" style={{ marginTop: '100px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center', marginBottom: '16px' }}>Why Fly With AeroGlide?</h3>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          We offer more than just reservations. Enjoy custom seat layout maps, direct cabin class pricing, and immediate client-side booking controls.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div className="card animate-fade-up" style={{ padding: '40px 30px', textAlign: 'center', animationDelay: '0.1s' }}>
            <div style={{ width: '64px', height: '64px', margin: '0 auto 24px', background: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={32} />
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Instant Confirmations</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Receive instant booking certificates. Our secure flow completes reservations in real-time.</p>
          </div>

          <div className="card animate-fade-up" style={{ padding: '40px 30px', textAlign: 'center', animationDelay: '0.2s' }}>
            <div style={{ width: '64px', height: '64px', margin: '0 auto 24px', background: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plane size={32} />
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Luxury Cabin Classes</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Compare rates across Economy, Business, or First Class cabins with real-time status cues.</p>
          </div>

          <div className="card animate-fade-up" style={{ padding: '40px 30px', textAlign: 'center', animationDelay: '0.3s' }}>
            <div style={{ width: '64px', height: '64px', margin: '0 auto 24px', background: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={32} />
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Full Booking Control</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Modify passenger listings or cancel upcoming journeys directly from your dashboard.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
