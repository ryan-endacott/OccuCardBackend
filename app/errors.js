module.exports = {

  badRequestError: function(err, res) {
    res.send(400, err);
  },

  unauthorizedError: function(err, res) {
    res.send(401, {
      error: {
        code: 401,
        type: 'Unauthorized'
      },
      message: 'Failed to authenticate.'
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
