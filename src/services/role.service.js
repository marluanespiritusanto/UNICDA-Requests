let _roleRepository = null;

class RoleService {
  constructor({ RoleRepository }) {
    _roleRepository = RoleRepository;
  }
  async getRole(id) {
    const role = await _roleRepository.get(id);
    return role;
  }

  async getRoleByName(name) {
    const role = await _roleRepository.getRoleByName(name);
    return role;
  }

  async getAllRoles() {
    const roles = await _roleRepository.getAll();
    return roles;
  }

  async createRole(role) {
    const createdRole = await _roleRepository.create(role);
    return createdRole;
  }

  async updateRole(id, role) {
    const updatedRole = await _roleRepository.update(id, role);
    return updatedRole;
  }

  async deleteRole(id) {
    return await _roleRepository.delete(id);
  }
}

module.exports = RoleService;
