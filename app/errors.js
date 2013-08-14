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
      message: 'Failed to authenticate with API Token.'
    });
  }

};
