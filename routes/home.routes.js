const router = require("express").Router();
const { HomeController } = require("../controllers");
const { AuthMiddleware, RoleMiddleware } = require("../middlewares");

router.get(
  "",
  [AuthMiddleware, RoleMiddleware("GENERAL")],
  HomeController.index
);

module.exports = router;
