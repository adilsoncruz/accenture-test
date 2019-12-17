const mongoose = require("mongoose");
const Promise = require("bluebird");

mongoose.Promise = Promise;

module.exports = app => {
  const { dbUri } = app.config;
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  mongoose.connect(dbUri, opts);
};
