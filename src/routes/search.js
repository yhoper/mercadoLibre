const express = require("express");
const router = express.Router();


//Middlewares validators
const {
  validateListSearch,
  validateItenSearch,
} = require("../validators/search.js");

//controller middlewares
const { listAll, getItem } = require("../controllers/search");

//routes

router.get("/:searching", validateListSearch, listAll); //product 4 items
router.get("/items/:id", validateItenSearch, getItem); //product 4 items

module.exports = router;