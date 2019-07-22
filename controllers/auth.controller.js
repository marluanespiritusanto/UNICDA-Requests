const { AuthService } = require("../services");

class AuthController {
  async signIn(req, res) {
    const { body } = req;
    const createdUser = await AuthService.signIn(body);
    return res.send({ user: createdUser });
  }

  async signUp(req, res) {
    const { body } = req;
    const token = await AuthService.signUp(body);
    return res.send({ token });
  }
}

module.exports = new AuthController();
