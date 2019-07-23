const { RoleService } = require("../services");

class RoleController {
  async getRole(req, res) {
    const { id } = req.params;
    const role = await RoleService.getRole(id);
    return res.send(role);
  }

  async getAllRoles(req, res) {
    const roles = await RoleService.getAllRoles();
    return res.send(roles);
  }

  async createRole(req, res) {
    const { body } = req;
    const createdRole = await RoleService.createRole(body);
    return res.status(201).send(createdRole);
  }

  async updateRole(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedRole = await RoleService.updateRole(id, body);
    return res.send(updatedRole);
  }

  async deleteRole(req, res) {
    const { id } = req.params;
    const deletedUser = await RoleService.deleteRole(id);
    return res.send(deletedUser);
  }
}

module.exports = new RoleController();
