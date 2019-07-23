const { Role } = require("../models");
const { StatusHelper } = require("../helpers");

class RoleRepository {
  async get(id) {
    const role = await Role.findOne({ _id: id, status: StatusHelper.ACTIVE });
    return role;
  }

  async getRoleByName(name) {
    const role = await Role.findOne({ name, status: StatusHelper.ACTIVE });
    return role;
  }

  async getAll() {
    const roles = await Role.find({ status: StatusHelper.ACTIVE });
    return roles;
  }

  async create(role) {
    const createdRole = await Role.create([role]);
    return createdRole;
  }

  async update(id, role) {
    const updatedRole = await Role.findByIdAndUpdate({ _id: id }, role, {
      new: true
    });

    return updatedRole;
  }

  async delete(id) {
    await Role.findByIdAndDelete(id);
    return true;
  }
}

module.exports = new RoleRepository();
