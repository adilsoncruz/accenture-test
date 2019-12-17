const errorHandler = (opts = {}) => (err, req, res, next) => {
  if (opts.debug) {
    console.error(err);
  }
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    mensagem: err.message
  });
  return next();
};

module.exports = errorHandler;
