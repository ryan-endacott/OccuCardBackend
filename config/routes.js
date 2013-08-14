// Set up routes for the app

// Controllers
var index = require('../app/controllers/index'),
  user = require('../app/controllers/user'),
  auth = require('./auth');

module.exports = function(app) {

	app.get('/', index.index);
  app.post('/user/register', user.register);
  app.post('/user/update', auth, user.update);
  app.get('/contacts/all', auth, contacts.all);
}
