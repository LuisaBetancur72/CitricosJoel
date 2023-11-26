
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MopedIcon from '@mui/icons-material/Moped';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { image } from "../../assets";
import './AdminLayout.scss';
import { Users } from '../../pages/admin/Users/Users';
import { useAuth } from "../../hooks";
import { FaBars } from "react-icons/fa";

export const AdminLayout = (props) => {
  const { children } = props;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleCerrarClick = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`admin-layout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="admin-layout__left">
        <img src={image.logo} alt="" className="logomenu" />
        <div>
        <div className="bars" onClick={toggleSidebar}>
            <FaBars />
          </div>
          {/* Agrega iconos a los elementos del menú */}
          <ul>
            <li onClick={() => handleOptionClick("Slider")} className={selectedOption === "Slider" ? "active" : ""}>
             
              <MopedIcon /> {isOpen && "Slider"}
            </li>
            <li onClick={() => handleOptionClick("Productos")} className={selectedOption === "Productos" ? "active" : ""}>
              
              <MopedIcon /> {isOpen && "Productos"}
            </li>
            <li onClick={() => handleOptionClick("Usuarios")} className={selectedOption === "Usuarios" ? "active" : ""}>
              
              <PeopleAltIcon /> {isOpen && "Usuarios"}
            </li>
            <li onClick={() => handleOptionClick("BaseDeDatos")} className={selectedOption === "BaseDeDatos" ? "active" : ""}>
           
              <FindInPageIcon /> {isOpen && "Base de Datos"}

            </li>
          </ul>
          <ul>
            <button onClick={handleCerrarClick}>Cerrar sesión</button>
          </ul>
        </div>
      </div>
      
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
        <h1>Dashboard</h1>
        </div>
        <div className="admin-layout__right-content">
          {/* Pasa la opción seleccionada y el manejador de clics al componente User */}
          <Users selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
        </div>
      </div>
    </div>
  );
};
