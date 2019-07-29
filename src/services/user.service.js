let _userRepository = null;

class UserService {
  constructor({ UserRepository }) {
    _userRepository = UserRepository;
  }

  async getUser(id) {
    const user = await _userRepository.get(id);
    return user;
  }

  async getUserByUsername(username) {
    const user = await _userRepository.getUserByUsername(username);
    return user;
  }

  async getAllUsers(pageSize, pageNum) {
    const users = await _userRepository.getAll(pageSize, pageNum);
    return users;
  }

  async createUser(user) {
    const createdUser = await _userRepository.create(user);
    return createdUser;
  }

  async updateUser(id, user) {
    const updatedUser = await _userRepository.update(id, user);
    return updatedUser;
  }

  async deleteUser(id) {
    return await _userRepository.delete(id);
  }
}

module.exports = UserService;
