const { Router } = require("express");

module.exports = function({ RoleController }) {
  const router = Router();

  router.get("", RoleController.getAllRoles);
  router.get("/:id", RoleController.getRole);
  router.post("", RoleController.createRole);
  router.patch("/:id", RoleController.updateRole);
  router.delete("/:id", RoleController.deleteRole);

  return router;
};
