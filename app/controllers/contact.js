var db = require('../db'),
  User = db.User,
  errors = require('../errors'),
  badRequest = errors.BadRequestError,
  internalError = errors.internalServerError;

exports.all = function(req, res) {
  req.user.populate('contacts', function(err, user) {
    if (err) return internalError(err, res);
    res.json(user.contacts);
  })
}
