let _authService = null;

class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signUp(req, res) {
    const { body } = req;
    const createdUser = await _authService.signUp(body);
    return res.send({ user: createdUser });
  }

  async signIn(req, res) {
    const { body } = req;
    const token = await _authService.signIn(body);
    return res.send({ token });
  }
}

module.exports = AuthController;
