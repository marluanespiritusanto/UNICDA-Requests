const { Router } = require("express");

module.exports = function({ UserController }) {
  const router = Router();

  router.get("", UserController.getAllUsers);
  router.get("/:id", UserController.getUser);
  router.post("", UserController.createUser);
  router.patch("/:id", UserController.updateUser);
  router.delete("/:id", UserController.deleteUser);

  return router;
};
