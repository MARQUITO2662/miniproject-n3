import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Nav from './components/Nav';
import LocationList from './components/LocationList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [staysData, setStaysData] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [showLocationList, setShowLocationList] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    fetch('stays.json')
      .then(response => response.json())
      .then(data => {
        setStaysData(data);
        setFilteredStays(data);
      })
      .catch(error => console.error('Error fetching stays data:', error));
  }, []);

  const uniqueLocations = Array.from(new Set(staysData.map(stay => stay.city)));

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowLocationList(false);
  };

  const handleAddAdult = () => setAdults(prev => prev + 1);
  const handleRemoveAdult = () => setAdults(prev => Math.max(0, prev - 1));
  const handleAddChildren = () => setChildren(prev => prev + 1);
  const handleRemoveChildren = () => setChildren(prev => Math.max(0, prev - 1));

  const handleSearch = () => {
    const filteredStays = staysData.filter(stay => {
      const locationMatch = stay.city.toLowerCase().includes(selectedLocation.toLowerCase());
      const guestsMatch = stay.maxGuests >= (adults + children);
      return locationMatch && guestsMatch;
    });
    setFilteredStays(filteredStays);
  };

  return (
    <div className="app">
      <Nav />
      <div className="search-container">
        <div className="location-search">
          <input
            type="text"
            placeholder="Location"
            className="location-input"
            onClick={() => setShowLocationList(!showLocationList)}
            value={selectedLocation}
            readOnly
          />
          {showLocationList && (
            <div className="location-list">
              {uniqueLocations.map((city, index) => (
                <div
                  key={index}
                  className="location-list-item"
                  onClick={() => handleLocationClick(city)}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {city}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="guest-controls">
          <div className="guest-buttons-column">
            <div className="guests-input">
              <span>Guests: </span>
              <input 
                type="text" 
                value={`${adults + children} ${adults + children === 1 ? 'guest' : 'guests'}`} 
                readOnly 
              />
            </div>
            <div className="guest-buttons">
              <div>
                <span><b>Adults</b> ages 13 or above</span>
                <div className="guest-buttons-container">
                  <button onClick={handleAddAdult}>+</button>
                  <span>{adults}</span>
                  <button onClick={handleRemoveAdult}>-</button>
                </div>
              </div>
              <div>
                <span><b>Children</b> ages 2-12</span>
                <div className="guest-buttons-container">
                  <button onClick={handleAddChildren}>+</button>
                  <span>{children}</span>
                  <button onClick={handleRemoveChildren}>-</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </button>
      </div>
      <div className="cards">
        {filteredStays.map((stay, index) => (
          <Card key={index} stay={stay} />
        ))}
      </div>
    </div>
  );
};

export default App;
