const { Router } = require("express");
const {
  AuthMiddleware,
  RoleMiddleware,
  CacheMiddleware,
  ParseIntMiddleware
} = require("../middlewares");
const { RoleHelper, CacheTimeHelper } = require("../helpers");

module.exports = function({ RequestController }) {
  const router = Router();

  router.get(
    "/me/pending",
    [AuthMiddleware, ParseIntMiddleware],
    RequestController.getPendingRequests
  );
  router.get(
    "/created",
    [AuthMiddleware, ParseIntMiddleware],
    RequestController.getCreatedRequests
  );
  router.get(
    "/me/created",
    [AuthMiddleware, ParseIntMiddleware],
    RequestController.getCreatedRequestsByUser
  );
  router.get(
    "/:requestRecordId/history",
    AuthMiddleware,
    RequestController.getRequestHistory
  );
  router.get(
    "",
    [CacheMiddleware(CacheTimeHelper.ONE_HOUR), ParseIntMiddleware],
    RequestController.getAllRequests
  );
  router.get("/:requestId", RequestController.getRequest);
  router.post(
    "",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RequestController.createRequest
  );
  router.patch(
    "/:requestId",
    [AuthMiddleware, RoleMiddleware(RoleHelper.ADMIN)],
    RequestController.updateRequest
  );
  router.delete(
    "/:requestId",
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
  router.post(
    "/approve/:requestHistoryId",
    AuthMiddleware,
    RequestController.approveRequest
  );
  router.post(
    "/disapprove/:requestHistoryId",
    AuthMiddleware,
    RequestController.disapproveRequest
  );
  router.delete(
    "/remove/:requestRecordId",
    AuthMiddleware,
    RequestController.deleteRequestRecord
  );
  router.get(
    "/formValues/:requestRecordId",
    AuthMiddleware,
    RequestController.getRecordFormValues
  );

  return router;
};
