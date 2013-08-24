var db = require('../app/db'),
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
  }

};
