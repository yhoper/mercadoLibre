const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
require("dotenv").config();

//app-server
const app = express();

//middelwares-server

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

readdirSync("./src/routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

const port = process.env.PORT || 8000;

//listen
app.listen(port, () => console.log(`Servicio corriendo en el purto ${port}`));
