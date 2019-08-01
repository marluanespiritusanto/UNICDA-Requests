const { Router } = require("express");
const { AuthMiddleware, RoleMiddleware } = require("../middlewares");
const { RoleHelper } = require("../helpers");

module.exports = function({ RoleController }) {
  const router = Router();

  router.get("", RoleController.getAllRoles);
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
