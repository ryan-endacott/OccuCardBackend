module.exports = {
  badRequest: function (err) {
    throw { status: 400, error: err};
  }
}
