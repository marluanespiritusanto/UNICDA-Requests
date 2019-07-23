const { JwtHelper } = require("../helpers");
const UserService = require("../services/user.service");

class AuthService {
  async signUp(user) {
    const { username } = user;
    const userExists = await UserService.getUserByUsername(username);

    if (userExists) {
      const error = new Error();
      error.status = 401;
      error.message = "User already exists";
      throw error;
    }

    return await UserService.createUser(user);
  }

  async signIn(user) {
    const { username, password } = user;

    const userExits = await UserService.getUserByUsername(username);

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

    const encodeUser = {};
    encodeUser.role = userExits.roles.map(role => role.name);
    encodeUser.username = userExits.username;
    encodeUser.id = userExits._id;

    const token = JwtHelper.generateToken(encodeUser);

    return token;
  }
}

module.exports = new AuthService();
