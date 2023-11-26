const Slider = require('../models/slider');
const image = require("../utils/image");
// Crear Slider
const createSlider = async (req, res) => {
  console.log(req.body);
  const { title, images, active } = req.body;

  try {
    const newSlider = new Slider({
      title,
      images,
      active,
      Created_at: new Date(), // Asumo que tu modelo tiene un campo llamado Created_at
    });

    const slideStorage = await newSlider.save();

    console.log(slideStorage);
    res.status(201).send(slideStorage);
  } catch (error) {
    console.error("Error al crear el Slider:", error);
    res.status(400).send({ msg: "Error al crear el Slider" });
  }
};


// Eliminar Slider
const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    await Slider.findByIdAndDelete(id);
    res.status(200).send({ msg: "Slider eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el Slider" });
  }
};

// Editar Slider
const updateSlider = async (req, res) => {
  
  try {
    const { id } = req.params;
    const sliderData = req.body;
    const existingSlider = await Slider.findById(id);
    if (!existingSlider) {
      return res.status(404).send({ msg: "Slider no encontrado" });
    }
    console.log("Request Body:", req.body);  // Asegúrate de recibir los datos esperados
    
    await Slider.findByIdAndUpdate(id, sliderData);

    const updatedSlider = await Slider.findById(id);

    res.status(200).send({ msg: "Actualización correcta", slider: updatedSlider });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error interno del servidor" });
  }
};

// buscar 1 Sliders
const getSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Slider.findById(id);
    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado Slider" });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

//listar todos lo sliders
const getSliders = async (req, res) => {
  try {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
      response = await Slider.find();
    } else {
      response = await Slider.find({ active });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
};

module.exports = {
  createSlider,
  deleteSlider,
  updateSlider,
  getSlider,
  getSliders,
};
