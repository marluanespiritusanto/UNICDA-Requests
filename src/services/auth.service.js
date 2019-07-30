const { JwtHelper } = require("../helpers");

let _userRepository = null;

class AuthService {
  constructor({ UserRepository }) {
    _userRepository = UserRepository;
  }
  async signUp(user) {
    const { username } = user;
    const userExists = await _userRepository.getUserByUsername(username);

    if (userExists) {
      const error = new Error();
      error.status = 401;
      error.message = "User already exists";
      throw error;
    }

    return await _userRepository.create(user);
  }

  async signIn(user) {
    const { username, password } = user;

    const userExits = await _userRepository.getUserByUsername(username);

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
    encodeUser.roles = userExits.roles.map(role => role.name);
    encodeUser.username = userExits.username;
    encodeUser.id = userExits._id;

    const token = JwtHelper.generateToken(encodeUser);

    return token;
  }
}

module.exports = AuthService;
