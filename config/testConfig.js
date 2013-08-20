// Test Configuration

// Try to load from secret config, otherwise use environment variables (heroku)

var s;

try {
  s = require ('./secretConfig');
}
catch (e) {
  s = {};
  s.db = {};
}

var config = {
  port: process.env.PORT || 3000,
  db: {
    uri: s.db.testuri || process.env.DB
  }
};

module.exports = config;
