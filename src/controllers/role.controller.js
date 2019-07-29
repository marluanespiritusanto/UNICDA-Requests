let _roleService = null;

class RoleController {
  constructor({ RoleService }) {
    _roleService = RoleService;
  }
  async getRole(req, res) {
    const { id } = req.params;
    const role = await _roleService.getRole(id);
    return res.send(role);
  }

  async getAllRoles(req, res) {
    const { pageSize, pageNum } = req.query;

    const roles = await _roleService.getAllRoles(
      parseInt(pageSize),
      parseInt(pageNum)
    );
    return res.send(roles);
  }

  async createRole(req, res) {
    const { body } = req;
    const createdRole = await _roleService.createRole(body);
    return res.status(201).send(createdRole);
  }

  async updateRole(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedRole = await _roleService.updateRole(id, body);
    return res.send(updatedRole);
  }

  async deleteRole(req, res) {
    const { id } = req.params;
    const deletedUser = await _roleService.deleteRole(id);
    return res.send(deletedUser);
  }
}

module.exports = RoleController;
