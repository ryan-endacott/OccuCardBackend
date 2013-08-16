var db = require('../app/db'),
  unauthorizedError = require('../app/errors').unauthorizedError,
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

// Manage authentification
module.exports = {

  requireToken: function requireToken(req, res, next) {
    var token = req.body.apiToken || req.query.apiToken;
    db.User.findOne({
      apiToken: token
    }, function(err, user) {
      if (err) return next(err);
      if (!user) return unauthorizedError(null, res); // no user found
      req.user = user; // user found
      next();
    });
  },

  setupPassport: function setupPassport() {
    passport.use(new BasicStrategy(
      function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        });
      }
    ));
  }

};
