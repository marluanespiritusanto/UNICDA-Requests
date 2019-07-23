const { UserService } = require("../services");

class UserController {
  async getUser(req, res) {
    const { id } = req.params;
    const role = await UserService.getUser(id);
    return res.send(role);
  }

  async getAllUsers(req, res) {
    const roles = await UserService.getAllUsers();
    return res.send(roles);
  }

  async createUser(req, res) {
    const { body } = req;
    const createdUser = await UserService.createUser(body);
    return res.status(201).send(createdUser);
  }

  async updateUser(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await UserService.updateUser(id, body);
    return res.send(updatedUser);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUser(id);
    return res.send(deletedUser);
  }
}

module.exports = new UserController();
