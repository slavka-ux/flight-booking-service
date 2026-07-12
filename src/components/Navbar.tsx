import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Plane, Calendar, User as UserIcon, LogOut, Search, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.75rem', fontWeight: 800 }}>
          <Plane className="animate-float" style={{ transform: 'rotate(45deg)', strokeWidth: 2.5 }} />
          <span>AeroGlide</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={16} /> Search Flights
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} /> My Bookings
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserIcon size={16} /> Profile
              </NavLink>
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', cursor: 'pointer' }} 
                onClick={() => navigate('/profile')}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  {user?.fullName.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  {user?.fullName.split(' ')[0]}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 20px' }}>
                <LogIn size={16} /> Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px' }}>
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
