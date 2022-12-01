const express = require("express");
const router = express.Router();

//Middlewares validators
const {
  validateListSearch
} = require("../validators/search.js");

//controller middlewares
const {
  listAll
} = require("../controllers/search");

router.get("/:searching", validateListSearch, listAll); //product 50 items
 
module.exports = router;

/**
 * @swagger
 *
 *components:
 *  schemas:
 *    Search:
 *      type: object
 *      properties:
 *        searching:
 *          type: "string"
 */
