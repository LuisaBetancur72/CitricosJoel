const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const app = express();


/* Cargar rutas */
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const sliderRoutes = require("./src/routes/slider");
const cartegoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/products");


/* Trabajar con la extensión client-rest */
app.use(bodyParser.json());
/* Pruebas de request utilizando postman */

/*app.use(bodyParser.urlencoded({ extended: true })); 
Evitar bloqueos en el navegador cuando estemos trabajando con
el backend y el front end a la vez */
app.use(cors());

app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/slider`, sliderRoutes);
app.use(`/api/${API_VERSION}/category`, cartegoryRoutes);
app.use(`/api/${API_VERSION}/product`, productRoutes);

module.exports = app;
