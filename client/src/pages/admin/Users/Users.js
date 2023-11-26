import React, { useState, useEffect } from "react";
import { ENV } from "../../../utils";
import { Auth } from "../../../api";
import { Sliders } from "../../../api";
import { Modal, Button, TextField } from "@mui/material";
import "./Users.scss";
import { SliderForm } from "../../../components/Admin/Auth";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";

const { BASE_PATH, API_ROUTES } = ENV;
const authInstance = new Auth();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const Users = (props) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { selectedOption } = props;
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSlider, setShowEditSlider] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const [editedSliderData, setEditedSliderData] = useState(null);
  const [usersPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken = authInstance.getAccessToken();
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const slidersInstance = new Sliders();

  const [sliderList, setSliderList] = useState([]);


  const getUsers = async () => {
    const url = `${BASE_PATH}/${API_ROUTES.GET_USERS}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    console.log("Usuario", userId);
    const url = `${BASE_PATH}/${API_ROUTES.UPDATE_USER}/${userId}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData), // Agrega el cuerpo de la solicitud con los datos actualizados
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const result = await response.json();
      console.log("Resultado de la actualización:", result);
      return result;
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    console.log("id User", userId);
    const url = `${BASE_PATH}/${API_ROUTES.DELETE_USER}/${userId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error al Editar:", error.message);
      throw error;
    }
  };

  const fetchSliders = async () => {
    try {
      const slidersData = await slidersInstance.getSliders();
      setSliderList(slidersData);
    } catch (error) {
      console.error("Error al obtener sliders:", error.message);
    }
  };
  const fetchData = async () => {
    if (selectedOption === "Usuarios") {
      try {
        const usersData = await getUsers();
        setUserList(usersData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
      }
    } else if (selectedOption === "Slider") {
      fetchSliders();
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const handleEditarUsuario = (userId) => {
    const userToEdit = userList.find((user) => user._id === userId);
    console.log("Usuario", userId);
    setEditedUserData(userToEdit);
    setShowEditModal(true); 
  };

  const handleEditarSlider = (sliderId) => {
    console.log("sliderdesde el edit", sliderId);
    const sliderToEdit = sliderList.find((slider) => slider._id === sliderId);
    console.log("sliderId", sliderId);
    setEditedSliderData(sliderToEdit);
    setShowEditSlider(true);
  };

  const handleEliminarUsuario = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUserId);
      fetchData();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedUserData(null);
  };
  const handleCloseSlider = () => {
    setShowEditSlider(false);
    setEditedSliderData(null);
  };

  const handleConfirmEdit = async () => {
    try {
      await updateUser(editedUserData?._id, editedUserData);
      fetchData();
      setShowEditModal(false);
      setEditedUserData(null);
    } catch (error) {
      console.error("Error al editar usuario:", error.message);
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleEdit = async () => {
    try {
      await slidersInstance.updateSlider(editedSliderData?._id,editedSliderData);
      fetchData();
      setShowEditSlider(false);
      setEditedSliderData(null);
    } catch (error) {
      console.error("Error al editar usuario:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  return (
    <div className="Administrativos">
      <h2>Admin</h2>
      {selectedOption === "Slider" && (
        <div className="Slider">
          <h2>Mis Slider</h2>
          <Box className="Box1">
            <Box className="Box2">
              <Tabs value={value} onChange={handleChange} className="Tabs">
                <Tab label="CREAR SLIDER" />
                <Tab label="PUBLICAR SLIDER" />
                <Tab label="EDITAR O ELIMINAR" />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div>
                <SliderForm />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div>
                <h1>Publicar SLIDER</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Dirección de Imagen</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sliderList
                      .slice(indexOfFirstUser, indexOfLastUser)
                      .map((slider) => (
                        <tr key={slider.Id}>
                          <td>{slider.title}</td>
                          <td>{slider.images}</td>
                          <td>{slider.active ? "Activo" : "Inactivo"}</td>
                          <td>
                            <Button
                              onClick={() => handleEditarSlider(slider._id)}>
                              Editar
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* Paginación */}
                <div className="pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    {"<"}
                  </button>
                  <span>{currentPage}</span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastUser >= sliderList.length}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div>
                <h1>Editar</h1>
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      )}
      {selectedOption === "Productos" && (
        <div className="Productos">
          <h2>Mis Productos</h2>
        </div>
      )}

      {selectedOption === "Usuarios" && (
        <div className="Usuarios">
          <h1>Mis Usuarios</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {userList.slice(indexOfFirstUser, indexOfLastUser).map((user) => (
                <tr key={user.Id}>
                  <td>{user.document}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.active ? "Activo" : "Inactivo"}</td>
                  <td>
                    <Button onClick={() => handleEditarUsuario(user._id)}>
                      Editar
                    </Button>
                    <Button onClick={() => handleEliminarUsuario(user._id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Paginación */}
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastUser >= userList.length}
            >
              {">"}
            </button>
          </div>
        </div>
      )}
      {selectedOption === "BaseDeDatos" && (
        <div className="BaseDeDatos">
          <h1>Base de Datos</h1>
        </div>
      )}
      {/* Modal para confirmar eliminación */}
      <Modal open={showDeleteModal} onClose={handleCloseDeleteModal}>
        <div className="modal">
          <p>¿Está seguro de que desea eliminar este usuario?</p>
          <Button onClick={handleConfirmDelete}>Sí</Button>
          <Button onClick={handleCloseDeleteModal}>No</Button>
        </div>
      </Modal>
      {/* Modal para Editar Usuario  */}
      <Modal open={showEditModal} onClose={handleCloseEditModal}>
        <div className="modalUser">
          {/* Formulario para editar usuario */}
          {editedUserData && (
            <>
              <h3>Editar usuario con ID: {editedUserData?.Id}</h3>
              <TextField
                label="Nuevo nombre"
                defaultValue={editedUserData?.firstname}
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    firstname: e.target.value,
                  })
                }
              />
              <TextField
                label="Nuevo apellido"
                defaultValue={editedUserData?.lastname}
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    lastname: e.target.value,
                  })
                }
              />
              <TextField
                label="Estado"
                defaultValue={editedUserData?.active.toString()} // Convert to string if active is boolean
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    active: e.target.value,
                  })
                }
              />
              <Button onClick={handleConfirmEdit}>Guardar</Button>
              <Button onClick={handleCloseEditModal}>Cancelar</Button>
            </>
          )}
        </div>
      </Modal>

      {/* Modal para editar Slider */}
      <Modal open={showEditSlider} onClose={handleCloseSlider}>
        <div className="modalUser">
          {/* Formulario para editar Slider */}
          <h3>Editar Slider con ID: {editedUserData?.Id}</h3>
          <TextField
            label="Estado"
            defaultValue={editedUserData?.active}
            onChange={(e) =>
              setEditedUserData({ ...editedUserData, active: e.target.value })
            }
          />
          <Button onClick={handleEdit}>Guardar</Button>
          <Button onClick={handleCloseSlider}>Cancelar</Button>
        </div>
      </Modal>
    </div>
  );
};
