const dotenv = require("dotenv");

if (process.env.NODE_ENV === "test") {
  dotenv.config();
}

const requiredEnv = ["PORT", "DB_URI"];

const checkEnvVars = () => {
  requiredEnv.forEach(reqVar => {
    if (!(reqVar in process.env)) {
      throw Error(`Required environment variable ${reqVar} is not set.`);
    }
  });
};

checkEnvVars();

module.exports = {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  secret: process.env.SECRET,
  expiresIn: process.env.TOKEN_EXPIRATE_IN
};
