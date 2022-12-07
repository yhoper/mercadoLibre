const express = require("express");
const router = express.Router();

//Middlewares validators
const {
  validateBoxSearch,
  validateListSearch,
  validateItemSearch,
} = require("../validators/search.js");

//controller middlewares
const { listBox, listAll, getItem } = require("../controllers/search");

//routes

router.get("/:searching", validateBoxSearch, listBox); //product 4 items
router.get("/list/:searching", validateListSearch, listAll); //product 4 items
router.get("/items/:id", validateItemSearch, getItem); //product 4 items

module.exports = router;
