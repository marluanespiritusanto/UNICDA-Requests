const { Router } = require("express");

module.exports = function({ FormTypeController }) {
  const router = Router();

  router.get("", FormTypeController.getAllFormTypes);
  router.get("/:id", FormTypeController.getFormType);
  router.post("", FormTypeController.createFormType);
  router.patch("/:id", FormTypeController.updateFormType);
  router.delete("/:id", FormTypeController.deleteFormType);

  return router;
};
