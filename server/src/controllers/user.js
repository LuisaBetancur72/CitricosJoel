const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");

const getMe = async (req, res) => {
  try {
    const { user_id } = req.user;
    const response = await User.findById(user_id);
    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado usuario" });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id);
    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado usuario" });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

const getUsers = async (req, res) => {
  try {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
      response = await User.find();
    } else {
      response = await User.find({ active });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = new User({ ...userData, active: false });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    user.password = hashedPassword;

    if (req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      user.avatar = imagePath;
    }
    const userStored = await user.save();
    // Enviar correo de activación
  
    res.status(201).send(userStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    // Verificar si el usuario existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    // Actualizar la contraseña si se proporciona
    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashPassword;
    } else {
      delete userData.password;
    }

    // Actualizar avatar si se proporciona
    if (req.files && req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      userData.avatar = imagePath;
    }

    // Realizar la actualización
    await User.findByIdAndUpdate(id, userData);

    // Obtener el usuario actualizado
    const updatedUser = await User.findById(id);

    // Enviar la respuesta con el usuario actualizado
    res.status(200).send({ msg: "Actualización correcta", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error interno del servidor" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).send({ msg: "Usuario eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el usuario" });
  }
};

module.exports = {
  getMe,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
