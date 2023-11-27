const express = require("express");
const multiparty = require("connect-multiparty");
const CategoryController = require("../controllers/categorty");
const middleware_authentication = require("../middlewares/authenticated");

const fs = require("fs");

const uploadDir = "./uploads/users/avatar";

// Verificar si el directorio existe, si no, crearlo
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const md_upload = multiparty({ uploadDir: "./uploads/users/avatar" });
const api = express.Router();

api.get("/", [middleware_authentication.ensureAuth], CategoryController.getCategorys);
api.get("/:id", [middleware_authentication.ensureAuth], CategoryController.getCategory);
api.post(
  "/create",
  [middleware_authentication.ensureAuth, md_upload],
  CategoryController.createCategory
);
api.patch(
  "/:id",
  [middleware_authentication.ensureAuth, md_upload],
  CategoryController.updateCategory
);
api.delete(
  "/:id",
  [middleware_authentication.ensureAuth],
  CategoryController.deleteCategoty
);

module.exports = api;
