const express = require("express");
const multiparty = require("connect-multiparty");
const SliderController = require("../controllers/slider");
const middleware_authentication = require("../middlewares/authenticated");
const path = require('path'); 
const fs = require("fs");

const uploadDir = "./public/Slider";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const md_upload = multiparty({ uploadDir: "./public/Slider" });

const api = express.Router();

api.get("/one", [middleware_authentication.ensureAuth], SliderController.getSlider);
api.get("/", SliderController.getSliders);
api.post(
  "/create",
  [middleware_authentication.ensureAuth, md_upload],
  SliderController.createSlider
);
api.patch(
  "/:id",
  [middleware_authentication.ensureAuth, md_upload],
  SliderController.updateSlider
);
api.delete(
  "/:id",
  [middleware_authentication.ensureAuth],
  SliderController.deleteSlider
);

module.exports = api;
