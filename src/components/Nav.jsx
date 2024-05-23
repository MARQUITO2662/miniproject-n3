import React, { useState, useEffect } from 'react';
import logo from '../const.jpg'; // Ruta de la imagen

const Nav = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    const message = prompt('Please leave a message or comment:');
    if (message) {
      alert('Your message has been submitted successfully.');
    }
  };

  const handleContactClick = () => {
    window.open('mailto:contact@example.com');
  };

  return (
    <header className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="nav__logo">
        <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
      </div>
      <ul className="nav__menu">
        <li className="nav__item"><a href="#" className="nav__link" onClick={handleHomeClick}>Home</a></li>
        <li className="nav__item"><a href="#" className="nav__link" onClick={handleAboutClick}>About</a></li>
        <li className="nav__item"><a href="#" className="nav__link" onClick={handleContactClick}>Contact</a></li>
      </ul>
    </header>
  );
};

export default Nav;
