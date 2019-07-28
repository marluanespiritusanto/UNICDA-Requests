const express = require("express");
const cors = require("cors");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");

module.exports = function({
  HomeRoutes,
  RoleRoutes,
  AuthRoutes,
  UserRoutes,
  RequestRoutes
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

  router.use("/api", apiRoute);
  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
