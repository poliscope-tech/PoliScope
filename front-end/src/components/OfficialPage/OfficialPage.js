// src/components/OfficialPage/OfficialPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './OfficialPage.css'; 

const OfficialPage = () => {
  let { officialId } = useParams();

  // You can fetch the official's data using officialId or display static content
  // For now, let's just display the name based on the URL
  const officialName = officialId.replace('-', ' ');

  return (
    <div className="official-page">
      <h2>{officialName}</h2>
      {/* Display the official's information here */}
    </div>
  );
};

export default OfficialPage;
