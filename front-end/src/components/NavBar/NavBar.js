// src/components/NavBar/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; // Make sure to create a NavBar.css file in the same directory

const NavBar = () => {
  // Your React component code will go here

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#000000' }}>
      <div className="logo-container">
        <div className="avatar" style={{ cursor: 'pointer', border: '3px solid white', borderRadius: '50%' }} onClick={() => {/* Navigate to home */}}>
          {/* Replace with <img> tag and set src to your profile picture */}
          <img src="path_to_profilepic.jpg" className="logo" style={{ borderRadius: '15%' }} alt="Profile" />
        </div>

        <div className="name-and-icons">
          {/* Update the navigation links as per your routing */}
          <NavLink to="/" className="navbar-brand spacing-nav" style={{ color: 'black', alignSelf: 'center' }}>
            William Francis
          </NavLink>
          <div className="social-media-icons">
            {/* Update these with your icons and links */}
            <NavLink to="/twitter" className="nav-link">
              <i className="fab fa-twitter"></i>
            </NavLink>
            {/* Repeat for other icons */}
          </div>
        </div>
      </div>
      {/* ...rest of the navbar code */}
    </nav>
  );
};

export default NavBar;
