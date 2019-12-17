const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  _id: Joi.string().required(),
  email: Joi.string().required(),
  nome: Joi.string().required(),
  data_criacao: Joi.date().required(),
  data_atualizacao: Joi.date().required(),
  ultimo_login: Joi.date().required(),
  token: Joi.string().required(),
  telefones: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().required(),
        numero: Joi.string().required(),
        ddd: Joi.string().required()
      })
    )
    .min(1)
    .required()
});

module.exports = userSchema;
