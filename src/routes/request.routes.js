const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function({ RequestController }) {
  const router = Router();

  router.get("", RequestController.getAllRequests);
  router.get("/:id", RequestController.getRequest);
  router.post("", RequestController.createRequest);
  router.patch("/:id", RequestController.updateRequest);
  router.delete("/:id", RequestController.deleteRequest);
  router.post("/:requestId/createForm", RequestController.createRequestForm);
  router.get("/:requestId/getForm", RequestController.getRequestForm);
  router.post(
    "/create/:requestId",
    AuthMiddleware,
    RequestController.createRequisition
  );

  return router;
};
