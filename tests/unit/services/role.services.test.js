const { RoleService } = require("../../../src/services");
const { RoleRepositoryMock } = require("../../mocks");
const {
  RoleModelMock: { role, roles }
} = require("../../mocks");

describe("Role Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should find a role by id", async () => {
    const RoleRepository = RoleRepositoryMock;
    RoleRepository.get.mockReturnValue(role);

    const _roleService = new RoleService({ RoleRepository });
    const expected = await _roleService.getRole(role._id);
    expect(expected).toMatchObject(role);
  });

  it("Should find a role by id", async () => {
    const RoleRepository = RoleRepositoryMock;
    RoleRepository.getRoleByName.mockReturnValue(role);

    const _roleService = new RoleService({ RoleRepository });
    const expected = await _roleService.getRoleByName(role._id);
    expect(expected).toMatchObject(role);
  });

  it("Should return a role collection", async () => {
    const RoleRepository = RoleRepositoryMock;
    RoleRepository.getAll.mockReturnValue(roles);

    const _roleService = new RoleService({ RoleRepository });
    const expected = await _roleService.getAllRoles();
    expect(expected).toMatchObject(roles);
  });

  it("Should create a role", async () => {
    const RoleRepository = RoleRepositoryMock;
    RoleRepository.create.mockReturnValue(role);

    const _roleService = new RoleService({ RoleRepository });
    const expected = await _roleService.createRole(role);
    expect(expected).toMatchObject(role);
  });

  it("Should update a role by id", async () => {
    const RoleRepository = RoleRepositoryMock;
    RoleRepository.update.mockReturnValue(role);

    const _roleService = new RoleService({ RoleRepository });
    const expected = await _roleService.updateRole(role._id, role);
    expect(expected).toMatchObject(role);
  });

  it("Should delete a role by id", async () => {
    const RoleRepository = RoleRepositoryMock;
    RoleRepository.update.mockReturnValue(role);

    const _roleService = new RoleService({ RoleRepository });
    const expected = await _roleService.updateRole(role._id);
    expect(expected).toMatchObject(role);
  });
});
