module.exports = {
  badRequestError: function(err, res) {
    res.send(400, err);
  }
};
