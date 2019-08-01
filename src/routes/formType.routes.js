const { Router } = require("express");
const { AuthMiddleware, RoleMiddleware } = require("../middlewares");
const { RoleHelper } = require("../helpers");

module.exports = function({ FormTypeController }) {
  const router = Router();

  router.get("", FormTypeController.getAllFormTypes);
  router.get("/:id", FormTypeController.getFormType);
  router.post(
    "",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    FormTypeController.createFormType
  );
  router.patch(
    "/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    FormTypeController.updateFormType
  );
  router.delete(
    "/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    FormTypeController.deleteFormType
  );

  return router;
};
