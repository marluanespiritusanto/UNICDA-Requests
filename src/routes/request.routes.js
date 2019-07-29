const { Router } = require("express");

module.exports = function({ RequestController }) {
  const router = Router();

  router.get("", RequestController.getAllRequests);
  router.get("/:id", RequestController.getRequest);
  router.post("", RequestController.createRequest);
  router.patch("/:id", RequestController.updateRequest);
  router.delete("/:id", RequestController.deleteRequest);
  router.post("/:requestId", RequestController.createRequestForm);

  return router;
};
