let _userRepository,
  _roleRepository = null;

class UserService {
  constructor({ UserRepository, RoleRepository }) {
    _userRepository = UserRepository;
    _roleRepository = RoleRepository;
  }

  async getUser(id) {
    const user = await _userRepository.get(id);
    return user;
  }

  async getUserByRole(roleId) {
    const user = await _userRepository.getUserByRole(roleId);
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

  async setRoleToUser(userId, roleId) {
    const userExists = await this.getUser(userId);
    if (!userExists) {
      const error = new Error();
      error.status = 404;
      error.message = "User does not exists";
      throw error;
    }

    const roleExist = await _roleRepository.get(roleId);

    if (!roleExist) {
      const error = new Error();
      error.status = 404;
      error.message = "Role does not exists";
      throw error;
    }

    const roleSetted = await _userRepository.setRoleToUser(userId, roleId);
    return roleSetted;
  }
}

module.exports = UserService;
