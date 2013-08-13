
var mongoose = require('mongoose'),
  config = require('../config/config'),
  Schema = mongoose.Schema;

mongoose.connect(config.db.uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to database!');
});

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
// There is a mongoose bug in handling uniqueness index.
// Can possibly use a custom validation that is subject to race conditions.
// http://nraj.tumblr.com/post/38706353543/handling-uniqueness-validation-in-mongo-mongoose
//    unique: true,
    trim: true
  },
  apiToken: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  contacts: [{type : mongoose.Schema.ObjectId, ref : 'User'}]
});

userSchema.methods.generateToken = function() {
  this.apiToken = 'randomlygeneratedUUID';
};

module.exports = {
  User: mongoose.model('User', userSchema)
}

