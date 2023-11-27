const Categori = require("../models/category");

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Categori.findById(id);
    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado categoria" });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

const getCategorys = async (req, res) => {
  try {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
      response = await Categori.find();
    } else {
      response = await Categori.find({ active });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};
const createCategory = async (req, res) => {

    console.log(req.body);
    const { name, active } = req.body;

    try {
      const newcategoty = new Categori({
        name,
        active,
      });
  
      const categotyStorage = await newcategoty.save();
  
      console.log(categotyStorage);
      res.status(201).send(categotyStorage);
    } catch (error) {
      console.error("Error al crear el categotyr:", error);
      res.status(400).send({ msg: "Error al crear el categoty" });
    }
  };

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;

    // Verificar si el usuario existe
    const existingCategory = await Categori.findById(id);
    if (!existingCategory) {
      return res.status(404).send({ msg: "Categoria no encontrado" });
    }
    await Categori.findByIdAndUpdate(id, categoryData);

    // Obtener el usuario actualizado
    const updatedCategory = await Categori.findById(id);

    // Enviar la respuesta con el usuario actualizado
    res.status(200).send({ msg: "Actualización correcta", categoty: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error interno del servidor" });
  }
};


const deleteCategoty = async (req, res) => {
  try {
    const { id } = req.params;
    await Categori.findByIdAndDelete(id);
    res.status(200).send({ msg: "Usuario eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el usuario" });
  }
};

module.exports = {
  getCategory,
  getCategorys,
  createCategory,
  updateCategory,
  deleteCategoty,
};
