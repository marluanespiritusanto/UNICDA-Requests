const { Router } = require("express");
const {
  AuthMiddleware,
  RoleMiddleware,
  CacheMiddleware
} = require("../middlewares");
const { RoleHelper, CacheTimeHelper } = require("../helpers");

module.exports = function({ RequestController }) {
  const router = Router();

  router.get(
    "",
    CacheMiddleware(CacheTimeHelper.ONE_HOUR),
    RequestController.getAllRequests
  );
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
  router.get("/history", AuthMiddleware, RequestController.getRequestHistory);

  return router;
};
