const auth = require('./api/auth');
const users = require('./api/users');
const companies = require('./api/companies');

module.exports = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/companies', companies);
};
