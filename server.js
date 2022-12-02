const express = require("express");

// const dotenv = require("dotenv");
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerConfig = require("./documentation/swagger.config.json");
// const swaggerJSDoc = require("swagger-jsdoc");
// require("dotenv").config();

const app = express();


// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
//   });

//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// app.use(express.json({ limit: "2mb" })); //le damos un limite a la respuesta de la data
// app.use(express.urlencoded({ extended: false })); //Con esto todos tus EndPoints sólo van a trabajar con json
// const swaggerDocs = swaggerJSDoc(swaggerConfig);
// app.use(
//   "/api/docs",
//   swaggerUI.serve,
//   swaggerUI.setup(swaggerDocs, { explorer: true })
// ); //Ruta para swagger , el explorer es un search para la docuntación.

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

//port
const port = process.env.PORT || 8000;

//listen
app.listen(port, () => console.log(`Servicio corriendo en el purto ${port}`));
