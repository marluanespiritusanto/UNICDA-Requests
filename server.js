const express = require("express");
const server = express();
require("express-async-errors");
const bodyParser = require("body-parser");
const { ErrorMiddleware, NotFoundMiddleware } = require("./middlewares");
const { HomeRoutes, AuthRoutes, RoleRoutes } = require("./routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use("/api/home", HomeRoutes);
server.use("/api/auth", AuthRoutes);
server.use("/api/role", RoleRoutes);

server.use(NotFoundMiddleware);
server.use(ErrorMiddleware);

module.exports = server;
