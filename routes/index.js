const auth = require('./api/auth');

module.exports = (app) => {
  app.use('/api/auth', auth);
};
