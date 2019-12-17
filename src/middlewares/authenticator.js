const jwt = require("jsonwebtoken");

module.exports = app => {
  const { secret } = app.config;

  const authenticator = (req, res, next) => {
    const { User } = app.models;

    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : req.query.token;

    if (!token) {
      return res.status(401).json({
        mensagem: "Não autorizado"
      });
    }

    return jwt.verify(token, secret, {}, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          mensagem:
            error.name === "TokenExpiredError"
              ? "Sessão inválida"
              : "Não autorizado"
        });
      }
      const userId = decoded.sub;

      return User.findById(userId, (err, user) => {
        if (err || !user || user.token !== token) {
          return res.status(401).json({
            mensagem: "Não autorizado"
          });
        }

        req.user = {
          id: user._id,
          email: user.email,
          token: user.token
        };

        return next();
      });
    });
  };

  return authenticator;
};
