module.exports = {

  badRequestError: function(err, res) {
    res.send(400, err);
  },

  loginUnauthorizedError: function(err, res) {
    res.send(401, {
      error: {
        code: 401,
        type: 'Unauthorized'
      },
      message: 'Failed to authenticate.  Email may already be taken.'
    });
  },

  unauthorizedError: function(err, res) {
    res.send(401, {
      error: {
        code: 401,
        type: 'Unauthorized'
      },
      message: 'Failed to authenticate with API token.'
    });
  },

  internalServerError: function(err, res) {
    console.log('Internal server error:');
    console.log(err);
    res.send(500, {
      error: {
        code: 500,
        type: 'Internal Server Error'
      },
      message: 'Internal Server Error'
    });
  }

};
