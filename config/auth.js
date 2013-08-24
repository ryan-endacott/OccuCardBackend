var db = require('../app/db'),
  config = require('./config'),
  unauthorizedError = require('../app/errors').unauthorizedError;

// Manage authentification
module.exports = {

  requireToken: function requireToken(req, res, next) {
    var token = req.body.userToken || req.query.userToken;
    if (!token) return unauthorizedError(null, res);
    db.User.findOne({
      token: token
    }, function(err, user) {
      if (err) return next(err);
      if (!user) return unauthorizedError(null, res); // no user found
      req.user = user; // user found
      next();
    });
  },

  requireAppToken: function requireAppToken(req, res, next) {
    var token = req.body.apiToken || req.query.apiToken;
    if (!token || token != config.appToken) return unauthorizedError(null, res);
    next();
  }

};
