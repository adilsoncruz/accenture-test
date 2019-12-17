const express = require("express");
const consign = require("consign");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "test") {
  dotenv.config({ path: "./test/.env" });
}

const app = express();

consign({ cwd: "src", verbose: false })
  .include("config.js")
  .then("db.js")
  .then("models")
  .then("controllers")
  .then("middlewares")
  .then("routes")
  .into(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(
    app.config.port,
    console.log(`Running on port: ${app.config.port}`)
  );
}

module.exports = app;
