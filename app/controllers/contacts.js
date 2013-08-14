var db = require('../db'),
  User = db.User,
  errors = require('../errors'),
  badRequest = errors.BadRequestError,
  internalError = errors.internalServerError;

exports.all = function(req, res) {
  req.user.populate('contacts', function(err, user) {
    if (err) return internalError(err, res);
    // TODO DONT SEND API TOKEN
    res.json(user.contacts);
  });
}

exports.addByEmail = function(req, res) {
  User.findOne({email: req.body.email}, function(err, newContact) {
    if (err) return internalError(err, res);
    if (!newContact) return badRequest({
      message: 'No contact found with that email.'
    }, res);
    req.user.contacts.push(newContact);
    req.user.save(function(err, user) {
      if (err) return internalError(err, res);
      // TODO DON'T SEND APITOKEN
      res.json(newContact); // Maybe send something else?
    });
  });
}


