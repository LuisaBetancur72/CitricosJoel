
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MopedIcon from '@mui/icons-material/Moped';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { image } from "../../assets";
import './AdminLayout.scss';
import { Users } from '../../pages/admin/Users/Users';
import { useAuth } from "../../hooks";

export const AdminLayout = (props) => {
  const { children } = props;
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleCerrarClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <img src={image.logo} alt="" className="logo" />
        <div>
          <h1>Dashboard</h1>
          {/* Agrega iconos a los elementos del menú */}
          <ul>
            <li onClick={() => handleOptionClick("Slider")} className={selectedOption === "Pedidos" ? "active" : ""}>
              <MopedIcon /> Slider
            </li>
            <li onClick={() => handleOptionClick("Productos")} className={selectedOption === "Pedidos" ? "active" : ""}>
              <MopedIcon /> Productos
            </li>
            <li onClick={() => handleOptionClick("Usuarios")} className={selectedOption === "Usuarios" ? "active" : ""}>
              <PeopleAltIcon /> Usuarios
            </li>
            <li onClick={() => handleOptionClick("BaseDeDatos")} className={selectedOption === "BaseDeDatos" ? "active" : ""}>
              <FindInPageIcon/> Base de Datos
            </li>
          </ul>
          <ul>
            <button onClick={handleCerrarClick}>Cerrar sesión</button>
          </ul>
        </div>
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header"></div>
        <div className="admin-layout__right-content">
          {/* Pasa la opción seleccionada y el manejador de clics al componente User */}
          <Users selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
        </div>
      </div>
    </div>
  );
};
