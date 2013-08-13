var db = require('../db'),
  User = db.User,
  errors = require('../errors'),
  badRequest = errors.BadRequestError;

exports.register = function(req, res, next){
  var user = new User(req.body.user);
  user.generateToken();
  user.save(function(err, user) {
    if (err) return badRequest(err, res);
    res.json(user);
  });
};

exports.update = function(req, res){

};
