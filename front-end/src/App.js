// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import OfficialPage from './components/OfficialPage/OfficialPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes> {/* Use Routes here */}
          <Route path="/" element={<HomePage />} />
          <Route path="/official/:officialId" element={<OfficialPage />} />
          {/* You can add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
