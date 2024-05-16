import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Nav from './components/Nav';
import LocationList from './components/LocationList';

const App = () => {
  const [staysData, setStaysData] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [showLocationList, setShowLocationList] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    // Obtener datos de stays.json
    fetch('stays.json')
      .then(response => response.json())
      .then(data => {
        setStaysData(data);
        setFilteredStays(data); // Inicialmente, mostrar todas las estancias
      })
      .catch(error => console.error('Error fetching stays data:', error));
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowLocationList(false);
  };

  const handleAddAdult = () => {
    setAdults(prevAdults => prevAdults + 1);
  };

  const handleRemoveAdult = () => {
    setAdults(prevAdults => Math.max(0, prevAdults - 1));
  };

  const handleAddChildren = () => {
    setChildren(prevChildren => prevChildren + 1);
  };

  const handleRemoveChildren = () => {
    setChildren(prevChildren => Math.max(0, prevChildren - 1));
  };

  const handleSearch = () => {
    // Filtrar los datos de estancias basados en los criterios de búsqueda
    const filteredStays = staysData.filter(stay => {
      // Lógica de filtrado basada en los criterios de búsqueda
      const locationMatch = stay.city.toLowerCase().includes(selectedLocation.toLowerCase());
      const guestsMatch = (stay.maxGuests >= (adults + children));
      // Agrega más criterios de filtrado si es necesario

      // Retornar true si todas las condiciones se cumplen
      return locationMatch && guestsMatch;
    });

    // Actualizar el estado de las estancias filtradas para mostrarlas en los resultados
    setFilteredStays(filteredStays);
  };

  return (
    <div className="app">
      <Nav />
      <div className="search-container">
        <div className="search">
          <div className="location-search">
            <input
              type="text"
              placeholder="Location"
              className="location-input"
              onClick={() => setShowLocationList(true)}
              value={selectedLocation}
              readOnly
            />
            {showLocationList && (
              <LocationList locations={staysData.map(stay => stay.city)} onSelectLocation={handleLocationClick} />
            )}
          </div>
          <div className="guest-controls">
            <div className="guest-buttons-column">
              <div className="guests-input">
                <span>Guests</span>
                <input type="text" value={adults + children} readOnly />
                <span>{adults + children === 1 ? 'guest' : 'guests'}</span>
              </div>
              <div className="guest-buttons">
                <span><b>Adults</b> ages <span style={{ color: '#808080' }}>13 or above</span></span>
                <div className="guest-buttons-container">
                  <button onClick={handleAddAdult}>+</button>
                  <span>{adults}</span>
                  <button onClick={handleRemoveAdult}>-</button>
                </div>
              </div>
              <div className="guest-buttons">
                <span><b>Children</b> ages <span style={{ color: '#808080' }}>2-12</span></span>
                <div className="guest-buttons-container">
                  <button onClick={handleAddChildren}>+</button>
                  <span>{children}</span>
                  <button onClick={handleRemoveChildren}>-</button>
                </div>
              </div>
            </div>
            <button className="search-button" onClick={handleSearch}>
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
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
