const auth = require('./api/auth');
const users = require('./api/users');

module.exports = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/users', users);
};
