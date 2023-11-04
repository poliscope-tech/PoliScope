// src/components/NavBar/NavBar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; // Make sure to create this file and define your styles

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="nav-container">
      <NavLink to="/" className="nav-item">
        Home
      </NavLink>

      <div className="dropdown">
        <button 
          className="dropbtn" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Elected Officials
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <NavLink to="/official/dean-preston" className="dropdown-item">
              Dean Preston
            </NavLink>
            {/* Additional Elected Officials will be added here */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
