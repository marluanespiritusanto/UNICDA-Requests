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
      _express.listen(_config.PORT, "192.168.0.3", () => {
        console.log("Application running on port " + _config.PORT);
        resolve();
      });
    });
  }
}

module.exports = Server;
