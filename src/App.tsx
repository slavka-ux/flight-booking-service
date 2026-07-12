import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Components
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SearchPage } from './pages/SearchPage';
import { FlightsPage } from './pages/FlightsPage';
import { BookPage } from './pages/BookPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ProfilePage } from './pages/ProfilePage';

// Import CSS
import './App.css';

const App: React.FC = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check if user is already authenticated (via localStorage)
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/book/:flightId" 
              element={
                <ProtectedRoute>
                  <BookPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookings" 
              element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
              <a href="#" style={{ color: 'var(--text-secondary)' }}>About Us</a>
              <a href="#" style={{ color: 'var(--text-secondary)' }}>Contact</a>
              <a href="#" style={{ color: 'var(--text-secondary)' }}>Terms of Service</a>
              <a href="#" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</a>
            </div>
            <p>&copy; {new Date().getFullYear()} AeroGlide. All rights reserved.</p>
            <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              This is a simulated demo environment.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
