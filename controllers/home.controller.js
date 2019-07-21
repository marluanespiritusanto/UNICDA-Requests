const { HomeService } = require("../services");

class HomeController {
  index(req, res, next) {
    return res.send(HomeService.index());
  }
}

module.exports = new HomeController();
