const { UserRepository } = require("../repositories");

class UserService {
  async getUser(id) {
    const user = await UserRepository.get(id);
    return user;
  }

  async getUserByUsername(username) {
    const user = await UserRepository.getUserByUsername(username);
    return user;
  }

  async getAllUsers() {
    const users = await UserRepository.getAll();
    return users;
  }

  async createUser(user) {
    const createdUser = await UserRepository.create(user);
    return createdUser;
  }

  async updateUser(id, user) {
    const updatedUser = await UserRepository.update(id, user);
    return updatedUser;
  }

  async deleteUser(id) {
    return await UserRepository.delete(id);
  }
}

module.exports = new UserService();
