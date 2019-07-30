// require("express-async-errors");
// const express = require("express");
// const server = express();
// const { ErrorMiddleware, NotFoundMiddleware } = require("../middlewares");
// const { HomeRoutes, AuthRoutes, RoleRoutes, UserRoutes } = require("../routes");

// server.use(express.json());

// server.use("/api/home", HomeRoutes);
// server.use("/api/auth", AuthRoutes);
// server.use("/api/role", RoleRoutes);
// server.use("/api/user", UserRoutes);

// server.use(NotFoundMiddleware);
// server.use(ErrorMiddleware);

// module.exports = server;

const express = require("express");
let _express = null;
let _config = null;

class Server {
  constructor({ config, router }) {
    _config = config;
    _express = express().use(router);
  }

  start() {
    return new Promise(resolve => {
      _express.listen(_config.PORT, () => {
        console.log("Application running on port " + _config.PORT);
        resolve();
      });
    });
  }
}

module.exports = Server;
