
var mongoose = require('mongoose'),
  config = require('../config/config'),
  Schema = mongoose.Schema,
  uuid = require('node-uuid');

mongoose.connect(config.db.uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to database!');
});

var userSchema = new Schema({
  apiToken: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  companyName: String,
  email: String,
  contacts: [{type : mongoose.Schema.ObjectId, ref : 'User'}]
});

userSchema.methods.generateToken = function() {
  this.apiToken = uuid.v4();
};

module.exports = {
  User: mongoose.model('User', userSchema)
}

