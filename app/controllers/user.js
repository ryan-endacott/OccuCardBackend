var db = require('../db'),
  User = db.User,
  errors = require('../errors'),
  badRequest = errors.badRequestError;

exports.register = function(req, res) {
  var user = new User(req.body.user);
  user.generateToken();
  user.save(function(err, user) {
    if (err) return badRequest(err, res);
    res.json(user);
  });
};

exports.update = function(req, res) {
  req.user.set(req.body.user).save(function(err, user) {
    if (err) return badRequest(err, res);
    res.json(user);
  });
};
