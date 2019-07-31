const { Router } = require("express");
const { AuthMiddleware, RoleMiddleware } = require("../middlewares");

module.exports = function({ StepController }) {
  const router = Router();

  router.get("", StepController.getAllSteps);
  router.get("/:id", StepController.getStep);
  router.post(
    "",
    [AuthMiddleware, RoleMiddleware("ADMIN")],
    StepController.createStep
  );
  router.patch(
    "/:id",
    [AuthMiddleware, RoleMiddleware("ADMIN")],
    StepController.updateStep
  );
  router.delete(
    "/:id",
    [AuthMiddleware, RoleMiddleware("ADMIN")],
    StepController.deleteStep
  );
  router.post(
    "/setSteps/:id",
    [AuthMiddleware, RoleMiddleware("ADMIN")],
    StepController.setStepToRequest
  );

  return router;
};
