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
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand text-gradient">
          <Plane className="animate-float" style={{ transform: 'rotate(45deg)', strokeWidth: 2.5 }} />
          <span>AeroGlide</span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Search size={16} />
            Search Flights
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/bookings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Calendar size={16} />
                My Bookings
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <UserIcon size={16} />
                Profile
              </NavLink>
              <div className="user-badge" onClick={() => navigate('/profile')}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  {user?.fullName.split(' ')[0]}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                  title="Logout"
                >
                  <LogOut size={16} style={{ marginLeft: 4 }} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/login" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                <LogIn size={15} /> Login
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
