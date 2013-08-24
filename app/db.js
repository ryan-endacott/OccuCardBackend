
var mongoose = require('mongoose'),
  config = require('../config/config'),
  Schema = mongoose.Schema,
  uuid = require('node-uuid'),
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

mongoose.connect(config.db.uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to database!');
});

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  apiToken: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  companyName: String,
  contacts: [{type : mongoose.Schema.ObjectId, ref : 'User'}]
});

// Generate api token
userSchema.pre('save', function(next) {
  // Maybe make this pre init
  // If no api token already added
  if (!this.apiToken || this.apiToken.length != 36) {
    this.apiToken = uuid.v4();
  }

  next();
});

// Bcrypt middleware for hashing password
userSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};


// Don't return API Token of any user
// specify the transform schema option
if (!userSchema.options.toJSON) userSchema.options.toJSON = {};
userSchema.options.toJSON.transform = function (doc, ret, options) {
  delete ret._id;
  delete ret.apiToken;
  delete ret.__v;
}

// Don't return API Token of any user
// specify the transform schema option
if (!userSchema.options.toObject) userSchema.options.toObject = {};
userSchema.options.toObject.transform = function (doc, ret, options) {
  delete ret.password;
}

module.exports = {
  User: mongoose.model('User', userSchema)
}

