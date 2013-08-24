var db = require('../db'),
  User = db.User,
  errors = require('../errors'),
  badRequest = errors.badRequestError,
  internalError = errors.internalServerError;

exports.all = function(req, res) {
  req.user.populate('contacts', function(err, user) {
    if (err) return internalError(err, res);
    res.json(user.contacts);
  });
}

exports.addByEmail = function(req, res) {
  User.findOne({email: req.body.email}, function(err, newContact) {
    if (err) return internalError(err, res);
    if (!newContact) return badRequest({
      message: 'No contact found with that email.'
    }, res);
    console.log('NUMBAS:  ' + req.user.contacts.indexOf(newContact));
    req.user.contacts.push(newContact);
    req.user.save(function(err, user) {
      if (err) return internalError(err, res);
      res.json(newContact);
    });
  });
}


