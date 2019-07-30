const express = require("express");
const cors = require("cors");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../config/swagger/swagger.json");

module.exports = function({
  HomeRoutes,
  RoleRoutes,
  AuthRoutes,
  UserRoutes,
  RequestRoutes,
  FormTypeRoutes
}) {
  const router = express.Router();
  const apiRoute = express.Router();

  apiRoute
    .use(cors())
    .use(express.json())
    .use(compression());

  apiRoute.use("/home", HomeRoutes);
  apiRoute.use("/role", RoleRoutes);
  apiRoute.use("/auth", AuthRoutes);
  apiRoute.use("/user", UserRoutes);
  apiRoute.use("/request", RequestRoutes);
  apiRoute.use("/formType", FormTypeRoutes);

  router.use("/api", apiRoute);
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
