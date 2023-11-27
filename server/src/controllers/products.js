const mongoose = require('mongoose');
const Product = require("../models/product");
const Category = require("../models/category");


const createProduct = async (req, res) => {
  const { name, active, image1,image2,image3, category, available, soldOut } = req.body;

  try {
    // Verificar si la categoría existe por el nombre
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      return res.status(400).send({ msg: "La categoría especificada no existe." });
    }

    // Crear un nuevo producto con la categoría existente
    const newProduct = new Product({
      name,
      active,
      image1,
      image2,
      image3,
      category: existingCategory._id, // Utilizar el _id de la categoría existente
      available,
      soldOut,
    });

    // Guardar el nuevo producto
    const productStorage = await newProduct.save();

    console.log(productStorage);
    res.status(201).send(productStorage);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).send({ msg: "Error interno del servidor al crear el producto." });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, active, images, category, available, soldOut } = req.body;

  try {
    // Verificar si el producto existe
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).send({ msg: "El producto especificado no existe." });
    }

    // Verificar si la nueva categoría existe
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      return res.status(400).send({ msg: "La categoría especificada no existe." });
    }

    // Actualizar los campos del producto
    existingProduct.name = name;
    existingProduct.active = active;
    existingProduct.images = images;
    existingProduct.category = existingCategory._id; // Utilizar el _id de la categoría existente
    existingProduct.available = available;
    existingProduct.soldOut = soldOut;

    // Guardar los cambios
    const updatedProduct = await existingProduct.save();

    res.status(200).send(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send({ msg: "Error interno del servidor al actualizar el producto." });
  }
};
  const deleteProduct = async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Verificar si el producto existe
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).send({ msg: "El producto especificado no existe." });
      }
  
      // Eliminar el producto
      await existingProduct.remove();
  
      res.status(200).send({ msg: "Producto eliminado exitosamente." });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).send({ msg: "Error interno del servidor al eliminar el producto." });
    }
  };

  const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).send(products);
    } catch (error) {
      console.error("Error al obtener todos los productos:", error);
      res.status(500).send({ msg: "Error interno del servidor al obtener todos los productos." });
    }
  };
  const getProductById = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send({ msg: "El producto especificado no existe." });
      }
  
      res.status(200).send(product);
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      res.status(500).send({ msg: "Error interno del servidor al obtener el producto por ID." });
    }
  };
    

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById
};
