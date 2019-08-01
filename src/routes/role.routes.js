const { Router } = require("express");
const {
  AuthMiddleware,
  RoleMiddleware,
  CacheMiddleware
} = require("../middlewares");
const { RoleHelper, CacheTimeHelper } = require("../helpers");

module.exports = function({ RoleController }) {
  const router = Router();

  router.get(
    "",
    CacheMiddleware(CacheTimeHelper.ONE_HOUR),
    RoleController.getAllRoles
  );
  router.get("/:id", RoleController.getRole);
  router.post(
    "",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RoleController.createRole
  );
  router.patch(
    "/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RoleController.updateRole
  );
  router.delete(
    "/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RoleController.deleteRole
  );

  return router;
};
