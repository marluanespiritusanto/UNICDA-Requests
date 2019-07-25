module.exports = (err, req, res, next) => {
  return res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message || "resource not found"
  });
};
