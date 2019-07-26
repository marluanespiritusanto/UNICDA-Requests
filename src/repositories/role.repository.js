const { StatusHelper } = require("../helpers");

let _role = null;

class RoleRepository {
  constructor({ Role }) {
    _role = Role;
  }
  async get(id) {
    const role = await _role.findOne({ _id: id, status: StatusHelper.ACTIVE });
    return role;
  }

  async getRoleByName(name) {
    const role = await _role.findOne({ name, status: StatusHelper.ACTIVE });
    return role;
  }

  async getAll() {
    const roles = await _role.find({ status: StatusHelper.ACTIVE });
    return roles;
  }

  async create(role) {
    const createdRole = await _role.create([role]);
    return createdRole;
  }

  async update(id, role) {
    const updatedRole = await _role.findByIdAndUpdate({ _id: id }, role, {
      new: true
    });

    return updatedRole;
  }

  async delete(id) {
    const deletedRole = await _role.findByIdAndDelete(id);
    return deletedRole.toJSON();
  }
}

module.exports = RoleRepository;
