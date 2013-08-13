var db = require('../db'),
  User = db.User,
  errors = require('../errors'),
  badRequest = errors.badRequest;

exports.register = function(req, res){
  var user = new User(req.body.user);
  user.generateToken();
  user.save(function(err, user) {
    if (err) badRequest(err);
    res.json(user);
  });
};

exports.update = function(req, res){

};
