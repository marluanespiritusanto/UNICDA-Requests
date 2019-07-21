const router = require("express").Router();
const { HomeController } = require("../controllers");

router.get("", HomeController.index);

module.exports = router;
