const { Router } = require("express");
const { AuthMiddleware, RoleMiddleware } = require("../middlewares");
const { RoleHelper } = require("../helpers");

module.exports = function({ RequestController }) {
  const router = Router();

  router.get("", RequestController.getAllRequests);
  router.get("/:id", RequestController.getRequest);
  router.post(
    "",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RequestController.createRequest
  );
  router.patch(
    "/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RequestController.updateRequest
  );
  router.delete(
    "/:id",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RequestController.deleteRequest
  );
  router.post(
    "/:requestId/createForm",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RequestController.createRequestForm
  );
  router.get("/:requestId/getForm", RequestController.getRequestForm);
  router.post(
    "/create/:requestId",
    AuthMiddleware,
    RequestController.createRequisition
  );

  return router;
};
