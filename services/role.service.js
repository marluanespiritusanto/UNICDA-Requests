const { RoleRepository } = require("../repositories");
class RoleService {
  async getRole(id) {
    const role = await RoleRepository.get(id);
    return role;
  }

  async getRoleByName(name) {
    const role = await RoleRepository.getRoleByName(name);
    return role;
  }

  async getAllRoles() {
    const roles = await RoleRepository.getAll();
    return roles;
  }

  async createRole(role) {
    const createdRole = await RoleRepository.create(role);
    return createdRole;
  }

  async updateRole(id, role) {
    const updatedRole = await RoleRepository.update(id, role);
    return updatedRole;
  }

  async deleteRole(id) {
    return await RoleRepository.delete(id);
  }
}

module.exports = new RoleService();
