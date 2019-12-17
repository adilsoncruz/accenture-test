const Joi = require("@hapi/joi");

const errorMessageSchema = Joi.object({
  mensagem: Joi.string()
});

module.exports = errorMessageSchema;
