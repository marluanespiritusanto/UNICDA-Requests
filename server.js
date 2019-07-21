const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const { ErrorMiddleware, NotFoundMiddleware } = require("./middlewares");
const { HomeRoutes } = require("./routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use("/api/home", HomeRoutes);

server.use(NotFoundMiddleware);
server.use(ErrorMiddleware);

module.exports = server;
