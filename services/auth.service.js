const { UserRepository } = require("../repositories");
const { JwtHelper } = require("../helpers");

class AuthService {
  async signUp(user) {
    const { username } = user;
    const userExists = await UserRepository.getByUsername(username);

    if (userExists) {
      const error = new Error();
      error.status = 401;
      error.message = "User already exists";
      throw error;
    }

    return await UserRepository.create(user);
  }

  async signIn(user) {
    const { username, password } = user;
    const userExits = await UserRepository.getByUsername(username);

    if (!userExits) {
      const error = new Error();
      error.status = 404;
      error.message = "Username does not exists";
      throw error;
    }

    const validPassword = userExits.comparePasswords(password);

    if (!validPassword) {
      const error = new Error();
      error.status = 401;
      error.message = "Invalid password";
      throw error;
    }

    const token = JwtHelper.generateToken(userExits);

    return token;
  }
}

module.exports = new AuthService();
