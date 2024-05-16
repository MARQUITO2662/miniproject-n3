import React from 'react';

const LocationCard = ({ location }) => {
  const { city, superHost, title } = location;

  return (
    <div className="location-card">
      <h2>{city}</h2>
      <p>{title}</p>
      {superHost && (
        <div className="host-info">
          <span className="star-icon">&#9733;</span>
          <span className="house-number">1</span>
        </div>
      )}
    </div>
  );
};

export default LocationCard;
