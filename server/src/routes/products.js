const express = require("express");
const multiparty = require("connect-multiparty");
const ProductController = require("../controllers/products");
const middleware_authentication = require("../middlewares/authenticated");

const fs = require("fs");

const uploadDir = "./uploads/users/avatar";

// Verificar si el directorio existe, si no, crearlo
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const md_upload = multiparty({ uploadDir: "./uploads/users/avatar" });
const api = express.Router();

api.get("/", [middleware_authentication.ensureAuth], ProductController.getAllProducts);
api.get("/:id", [middleware_authentication.ensureAuth], ProductController.getProductById);
api.post(
  "/create",
  [middleware_authentication.ensureAuth, md_upload],
  ProductController.createProduct
);
api.patch(
  "/:id",
  [middleware_authentication.ensureAuth, md_upload],
  ProductController.updateProduct
);
api.delete(
  "/:id",
  [middleware_authentication.ensureAuth],
  ProductController.deleteProduct
);

module.exports = api;
