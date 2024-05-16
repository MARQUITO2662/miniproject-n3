// LocationList.jsx
import React from 'react';

const LocationList = ({ locations, onSelectLocation }) => {
  // Utilizamos un conjunto (Set) para almacenar ubicaciones únicas
  const uniqueLocations = [...new Set(locations)];

  return (
    <ul>
      {uniqueLocations.map((location, index) => (
        <li key={index} onClick={() => onSelectLocation(location)}>
          {location}
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
