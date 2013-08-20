var db = require('../app/db'),
  unauthorizedError = require('../app/errors').unauthorizedError,
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy;

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
        db.User.findOne({ email: email }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          user.comparePassword(password, function(err, isMatch) {
            if (err) return done(err);
            if (isMatch) return done(null, user);
            return done(null, false); // no match
          });
        });
      }
    ));
  },

  loginPassport: passport.authenticate('basic', { session: false })

};
