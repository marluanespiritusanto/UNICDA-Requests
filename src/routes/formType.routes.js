const { Router } = require("express");

const {
  AuthMiddleware,
  RoleMiddleware,
  CacheMiddleware
} = require("../middlewares");
const { RoleHelper, CacheTimeHelper } = require("../helpers");

module.exports = function({ FormTypeController }) {
  const router = Router();

  router.get(
    "",
    CacheMiddleware(CacheTimeHelper.ONE_HOUR),
    FormTypeController.getAllFormTypes
  );
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
