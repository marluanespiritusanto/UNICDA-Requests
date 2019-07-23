const router = require("express").Router();
const { HomeController } = require("../controllers");
const {
  AuthMiddleware: { AuthMiddleware }
} = require("../middlewares");

router.get("", HomeController.index);

module.exports = router;
