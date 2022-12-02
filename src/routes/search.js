const express = require("express");
const router = express.Router();
const cors = require("cors");

//Middlewares validators
const { validateListSearch, validateItenSearch } = require("../validators/search.js");

//controller middlewares
const { listAll, getItem } = require("../controllers/search");

router.get("/:searching", cors(), listAll); //product 50 items
router.get("/items/:id", cors(), validateItenSearch, getItem); //product 50 items

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
