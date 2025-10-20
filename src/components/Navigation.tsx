import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <h2>Pokedex</h2>
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            List View
          </Link>
          <Link 
            to="/gallery" 
            className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
          >
            Gallery View
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

