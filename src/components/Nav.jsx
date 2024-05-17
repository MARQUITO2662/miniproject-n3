import React from 'react';

const Nav = () => {
  // Función para manejar el clic en el enlace "Home"
  const handleHomeClick = () => {
    // Desplazarse hacia arriba en la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para mostrar un cuadro de entrada al hacer clic en el enlace "About"
  const handleAboutClick = () => {
    const message = prompt('Please leave a message or comment:');
    if (message !== null) {
      // Aquí podrías enviar el mensaje a alguna API o hacer algo con él
      alert('Your message has been submitted successfully.');
    }
  };

  // Función para abrir una ventana de correo electrónico al hacer clic en el enlace "Contact"
  const handleContactClick = () => {
    // Abre una nueva ventana de correo electrónico con la dirección proporcionada
    window.open('mailto:contact@example.com');
  };

  return (
    <footer className="navbar">
      <div className="nav__logo">Your Logo</div>
      <ul className="nav__menu">
        <li className="nav__item"><a href="#" className="nav__link" onClick={handleHomeClick}>Home</a></li>
        <li className="nav__item"><a href="#" className="nav__link" onClick={handleAboutClick}>About</a></li>
        <li className="nav__item"><a href="#" className="nav__link" onClick={handleContactClick}>Contact</a></li>
      </ul>
    </footer>
  );
};

export default Nav;
