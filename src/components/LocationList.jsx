// LocationList.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const LocationList = ({ locations, onSelectLocation }) => {
  // Utilizamos un conjunto (Set) para almacenar ubicaciones únicas
  const uniqueLocations = [...new Set(locations)];

  return (
    <ul>
      {uniqueLocations.map((location, index) => (
        <li key={index} onClick={() => onSelectLocation(location)}>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
