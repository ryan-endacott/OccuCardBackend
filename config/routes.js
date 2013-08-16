// Set up routes for the app

// Controllers
var index = require('../app/controllers/index'),
  user = require('../app/controllers/user'),
  contacts = require('../app/controllers/contacts'),
  requireToken = require('./auth').requireToken;

module.exports = function(app) {

	app.get('/', index.index);
  app.post('/user/register', user.register);
  app.post('/user/update', requireToken, user.update);
  app.get('/contacts', requireToken, contacts.all);
  app.post('/contacts/add/email', requireToken, contacts.addByEmail);
}
