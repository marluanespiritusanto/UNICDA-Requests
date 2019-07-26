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
    const expected = await _roleService.getRole("507f191e810c19729de860ea");
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
  });

  it("Should return a role collection", async () => {
    const RoleRepository = RoleRepositoryMock;
    RoleRepository.getAll.mockReturnValue(roles);

    const _roleService = new RoleService({ RoleRepository });
    const expected = await _roleService.getAllRoles();
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(roles);
  });
});
