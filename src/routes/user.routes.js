const { Router } = require("express");
const {
  AuthMiddleware,
  RoleMiddleware,
  CacheMiddleware,
  ParseIntMiddleware
} = require("../middlewares");
const { RoleHelper, CacheTimeHelper } = require("../helpers");

module.exports = function({ UserController }) {
  const router = Router();

  router.get(
    "",
    [CacheMiddleware(CacheTimeHelper.ONE_HOUR), ParseIntMiddleware],
    UserController.getAllUsers
  );
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
    "/setRole/:userId",
    [AuthMiddleware],
    UserController.setRoleToUser
  );

  return router;
};
