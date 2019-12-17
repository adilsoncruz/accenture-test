const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

module.exports = app => {
  app.set("port", 3000);
  app.set("json spaces", 4);
  if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
  app.use(helmet());
  app.use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowHeaders: ["Content-Type", "Accept", "Authorization"]
    })
  );
  app.use(compression());
  app.use(bodyParser.json());
};
