
import React, { useState } from "react";
import { useAuth } from "../../hooks";
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StoreIcon from '@mui/icons-material/Store';
import { image } from "../../assets";
import './ClientLayout.scss';
import { User } from '../../pages/admin/User';

export const ClientLayout = (props) => {
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
    <div className="client-layout">
      <div className="client-layout__left">
        <img src={image.logo} alt="" className="logo" />
        <div>
          <h1>Dashboard</h1>
          {/* Agrega iconos a los elementos del menú */}
          <ul>
            <li onClick={() => handleOptionClick("Tienda")} className={selectedOption === "Tienda" ? "active" : ""}>
              <StoreIcon /> Tienda
            </li>
            <li onClick={() => handleOptionClick("Mis Compras")} className={selectedOption === "Mis Compras" ? "active" : ""}>
              <AddShoppingCartIcon /> Mis compras
            </li>
            <li onClick={() => handleOptionClick("Mis Datos")} className={selectedOption === "Mis Datos" ? "active" : ""}>
              <AccountBoxIcon /> Mis datos
            </li>
          </ul>
          <ul>
            <button onClick={handleCerrarClick}>Cerrar sesión</button>
          </ul>
        </div>
      </div>
      <div className="client-layout__right">
        <div className="client-layout__right-header"></div>
        <div className="client-layout__right-content">
          {/* Pasa la opción seleccionada y el manejador de clics al componente User */}
          <User selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
        </div>
      </div>
    </div>
  );
};
