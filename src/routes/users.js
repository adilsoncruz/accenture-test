const { check } = require("express-validator");

const errorHandler = require("../middlewares/handlerError");
const validateParams = require("../middlewares/validateParams")();

module.exports = app => {
  const Controller = app.controllers.user;
  const auth = app.middlewares.authenticator;

  app.route("/user/signup").post(
    [
      check("email")
        .isEmail()
        .withMessage("Informe Um Email valido"),
      check("senha")
        .isLength({ min: 5 })
        .withMessage("A senha precisa ter no minimo 5 digitos"),
      check("telefones")
        .isLength({ min: 1 })
        .withMessage("Informe pelo menos 1 numero de telefone"),
      check("telefones.*.ddd").exists(),
      check("telefones.*.numero").exists()
    ],
    validateParams,
    Controller.signUp
  );
  app
    .route("/user/signin")
    .post(
      [check("email").isEmail(), check("senha").isLength({ min: 5 })],
      validateParams,
      Controller.signIn
    );

  app
    .route("/user/:user_id")
    .all(auth)
    .get(Controller.getUser);

  app.use(errorHandler());
};
