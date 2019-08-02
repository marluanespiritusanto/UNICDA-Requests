const { Router } = require("express");
const {
  AuthMiddleware,
  RoleMiddleware,
  CacheMiddleware
} = require("../middlewares");
const { RoleHelper, CacheTimeHelper } = require("../helpers");

module.exports = function({ RequestController }) {
  const router = Router();

  router.get("/created", AuthMiddleware, RequestController.getCreatedRequests);
  router.get(
    "/me/created",
    AuthMiddleware,
    RequestController.getCreatedRequestsByUser
  );
  router.get(
    "/:requestRecordId/history",
    AuthMiddleware,
    RequestController.getRequestHistory
  );
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

  return router;
};
