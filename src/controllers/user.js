const createError = require("http-errors");
const jwt = require("jsonwebtoken");
module.exports = app => {
  const { User } = app.models;
  const { expiresIn } = app.config;

  const buildToken = sub => {
    const payload = { sub };
    return jwt.sign(payload, app.config.secret, {
      expiresIn: expiresIn
    });
  };

  const Controller = {};

  Controller.signIn = async (req, res, next) => {
    try {
      const { email, senha } = req.body;

      const user = await User.findOne({ email });

      if (!user || !user.validPassword(senha, user)) {
        return next(createError(401, "Usuário e/ou senha inválidos"));
      }

      user.token = buildToken(user._id);
      user.ultimo_login = new Date();
      await user.save();

      let data = user.toObject({ flattenMaps: true });
      delete data.senha;

      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  Controller.signUp = async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      user.token = buildToken(user._id);
      await user.save();
      let data = user.toObject({ flattenMaps: true });
      delete data.senha;

      res.json(data);
    } catch (err) {
      if (err.code === 11000) {
        return next(createError(401, "E-mail já existente"));
      }
      next(err);
    }
  };

  Controller.getUser = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const token = req.headers.authorization.split(" ")[1];

      const user = await User.findById(user_id, { __v: -1, senha: -1 }).lean();
      if (user.token === token) {
        createError(401, "Não autorizado");
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  return Controller;
};
