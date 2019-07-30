const { Router } = require("express");
const { AuthMiddleware, RoleMiddleware } = require("../middlewares");
const { RoleHelper } = require("../helpers");

module.exports = function({ UserController }) {
  const router = Router();

  router.get("", UserController.getAllUsers);
  router.get("/:id", UserController.getUser);
  router.post(
    "",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    UserController.createUser
  );
  router.patch(
    "/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    UserController.updateUser
  );
  router.delete(
    "/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    UserController.deleteUser
  );
  router.post(
    "/setRole/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    UserController.setRoleToUser
  );

  return router;
};
