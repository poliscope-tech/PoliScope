// src/components/NavBar/NavBar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div>
        <NavLink to="/" className="nav-link" exact>
          Home
        </NavLink>

        <div className="dropdown">
          <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
            Elected Officials
          </button>
          {isOpen && (
            <div className="dropdown-content">
              <NavLink to="/official/dean-preston" className="dropdown-item">
                Dean Preston
              </NavLink>
              {/* Add more officials as needed */}
            </div>
          )}
        </div>
      </div>
      {/* Add additional navbar items or empty div if needed for spacing */}
    </nav>
  );
};

export default NavBar;
