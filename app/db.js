
var mongoose = require('mongoose'),
  config = require('../config/config'),
  Schema = mongoose.Schema;

mongoose.connect(config.db.uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to database!');
});

var personSchema = new Schema({
  username: String,
  apiToken: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  contacts: [{type : mongoose.Schema.ObjectId, ref : 'Person'}]
});

module.exports = {
  Person: mongoose.model('Person', personSchema)
}

