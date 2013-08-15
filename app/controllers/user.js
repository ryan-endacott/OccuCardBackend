var db = require('../db'),
  User = db.User,
  errors = require('../errors'),
  badRequest = errors.badRequestError;

exports.register = function(req, res) {
  var user = new User(req.body.user);
  user.generateApiToken();
  user.save(function(err, user) {
    if (err) return badRequest(err, res);
    res.json(user.toObject()); // Send toObject to include apiToken
  });
};

exports.update = function(req, res) {
  req.user.set(req.body.user).save(function(err, user) {
    if (err) return badRequest(err, res);
    res.json(user);
  });
};
