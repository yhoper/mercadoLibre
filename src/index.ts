const express = require("express");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
require("dotenv").config();


const app = express();

//middelwares-server
app.use(express.json({ limit: "2mb" })); //le damos un limite a la respuesta de la data
app.use(express.urlencoded({ extended: false })); //Con esto todos tus EndPoints sólo van a trabajar con json

readdirSync("./routes").map((r:any) => console.log(r));

//port
const port = process.env.PORT || 8000;

//listen
app.listen(port, () => console.log(`Servicio corriendo en el purto ${port}`));