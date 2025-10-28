import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getCurrentUser } from '../utils/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = getCurrentUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            🎫 TicketApp
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Navigation Links */}
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {authenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/tickets" 
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tickets
                </Link>
                <span className="nav-user">👤 {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth/login" 
                  className="btn btn-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/auth/signup" 
                  className="btn btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;