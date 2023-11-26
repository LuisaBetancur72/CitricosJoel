import React, { useState } from 'react';
import './StylesMenu.scss';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/png/logo.png';
import Avatar from '../../../assets/png/avatar.png';
import 'font-awesome/css/font-awesome.min.css';
import homeIcon from '../../../assets/png/home.png';
import contactIcon from '../../../assets/png/contact.png';
import menuIcon from '../../../assets/png/menu.png';

const Menu = () => {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isIconMode, setIconMode] = useState(false);
  

  const toggleIconMode = () => {
    setIconMode((prevState) => !prevState);
  };

  // Función para desplazar suavemente a una sección
  const scrollToSection = (sectionId) => {
    if (sectionId === '/') {
      toggleIconMode(); // Activa el modo de iconos al hacer clic en "PUNTOS DE VENTA"
    }
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    handleToggleMenu(); // Cierra el menú después de hacer clic en un enlace
  };

  const handleToggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="menu">
      <Link to="/">
        <img src={Logo} alt="Logo UAM" className="logo" />
      </Link>
      {isIconMode && (
        <div className={`navbar-options-icon-mode ${isMenuOpen ? 'active' : ''}`}>
          <div className="iconM" onClick={() => scrollToSection('/')}>
            <img src={homeIcon} alt="Home" />
          </div>
          <div className="iconM" onClick={() => scrollToSection('puntosdeventa')}>
            <img src={contactIcon} alt="puntosdeventa" />
          </div>
          <div className="iconM" onClick={() => scrollToSection('centrodeclasificacion')}>
            <img src={menuIcon} alt="centrodeclasificacion" />
          </div>
        </div>
      )}

      {/* Modo normal */}
      {!isIconMode && (
        <ul className={`navbar-options ${isMenuOpen ? 'active' : ''}`}>
          <li>
          <Link to="/" onClick={() => scrollToSection('/')}>
              INICIO
            </Link>
          </li>
          <li>
            <a href="#puntosdeventa" onClick={() => scrollToSection('puntosdeventa')}>
              PUNTOS DE VENTA
            </a>
          </li>
          <li>
            <a href="#centrodeclasificacion" onClick={() => scrollToSection('centrodeclasificacion')}>
              CENTRO DE CLASIFICACION
            </a>
          </li>
        </ul>
      )}

      <div className="avatar-container">
        <Link to="/admin/login">
          <div className="Login">
            <p>LOGIN</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;