const { check, param } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

//middelwar

const validateListSearch = [
  param("searching")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Debe indicar una opción válida de búsqueda")
    .isLength({ min: 2 })
    .withMessage("Debe tener más 2 caracteres"),

  //Definición
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateItenSearch = [
  param("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Debe indicar una opción válida de búsqueda")
    .isLength({ min: 4 })
    .withMessage("Debe tener más 4 caracteres"),

  //Definición
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

//exportar el modulo

module.exports = { validateListSearch, validateItenSearch };
