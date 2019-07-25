module.exports = (req, res, next) => {
  return res.status(404).send({ status: 404, message: "resource not found" });
};
