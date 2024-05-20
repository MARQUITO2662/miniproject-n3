import React from 'react';

const Card = ({ stay }) => {
  const { city, superHost, title, photo, country, type, rating, maxGuests, beds } = stay;

  return (
    <div className="card">
      <div className="card__overlay"></div> {/* Agregamos un overlay transparente */}
      <img src={photo} alt={title} className="card__image" />
      <div className="card__details">
        <h2 className="card__title">{title}</h2>
        <p className="card__location">{city}, {country}</p>
        <p className="card__type">{type}</p>
        <div className="card__rating">
          <span className="star">&#9733;</span>
          <span className="rating-number">{rating}</span>
        </div>
        {superHost && (
          <p className="card__superhost">Superhost</p>
        )}
        <p className="card__guests">Max Guests: {maxGuests}</p>
        <p className="card__beds">Beds: {beds || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Card;
