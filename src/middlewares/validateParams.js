const { validationResult } = require("express-validator");
const createError = require("http-errors");

const validateParams = () => (req, res, next) => {
  const result = validationResult(req);

  if (result.errors.length) {
    next(createError(422, "parametros invalidos"));
  }
  return next();
};

module.exports = validateParams;
