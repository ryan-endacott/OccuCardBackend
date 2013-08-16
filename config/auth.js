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
    // Use the LocalStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a username and password), and invoke a callback
    //   with a user object.  In the real world, this would query a database;
    //   however, in this example we are using a baked-in set of users.
    passport.use(new LocalStrategy(function(username, password, done) {
      User.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Unknown user ' + username
          });
        }
        user.comparePassword(password, function(err, isMatch) {
          if (err) return done(err);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Invalid password'
            });
          }
        });
      });
    }));

  };
