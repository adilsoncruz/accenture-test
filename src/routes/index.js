module.exports = (app) => {
  app.get('/', (req, res) => res.json({
    status: `Alive on port: ${app.config.port}`,
  }));
};
