var db = require('../db'),
  User = db.User,
  errors = require('../errors'),
  badRequest = errors.badRequestError;


exports.registerOrGetToken = function(req, res) {

  db.User.findOne({ email: req.body.email }, function(err, user) {
    if (err) return badRequest(err);

    if (!user) { // create new user if none found with email

      var user = new User(req.body.user);
      user.save(function(err, user) {
        if (err) return badRequest(err, res);
        res.json(user.toObject()); // Send toObject to include apiToken
      });

    } else { // Otherwise, check if the password matches
      user.comparePassword(req.query.password, function(err, isMatch) {
        if (err) return badRequest(err);
        if (isMatch) {
          res.json(user.toObject()); // Send toObject to include apiToken
        }
        else {
          return unauthorizedError(null, res); // no match
        }
      });
    }
  });

};

exports.update = function(req, res) {
  req.user.set(req.body.user).save(function(err, user) {
    if (err) return badRequest(err, res);
    res.json(user);
  });
};

