const { RoleRepository } = require("../../../src/repositories");
const mockingoose = require("mockingoose").default;
const { Role } = require("../../../src/models");
const {
  RoleModelMock: { role, roles }
} = require("../../mocks");

describe("Role Repository", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it("Should find a role by id", async () => {
    mockingoose(Role).toReturn(role, "findOne");

    const _roleRepository = new RoleRepository({ Role });
    const expected = await _roleRepository.get(role._id);

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
  });

  it("Should return a role by its name", async () => {
    mockingoose(Role).toReturn(role, "findOne");
    const _roleRepository = new RoleRepository({ Role });
    const expected = await _roleRepository.getRoleByName(role.name);

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
  });

  it("Should create a new role", async () => {
    mockingoose(Role).toReturn(role, "create");
    const _roleRepository = new RoleRepository({ Role });
    const expected = await _roleRepository.create(role);

    expect(JSON.parse(JSON.stringify(expected[0]))).toMatchObject(role);
  });

  it("Should return a role collection", async () => {
    mockingoose(Role).toReturn(roles, "find");

    const _roleRepository = new RoleRepository({ Role });
    const expected = await _roleRepository.getAll();

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(roles);
  });

  it("Should update an especific role by id", async () => {
    mockingoose(Role).toReturn(role, "findOneAndUpdate");

    const _roleRepository = new RoleRepository({ Role });
    const expected = await _roleRepository.update(role._id, {
      name: "BACK_OFFICE"
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
  });

  it("Should delete an especific role by id", async () => {
    mockingoose(Role).toReturn(role, "findOneAndDelete");
    const _roleRepository = new RoleRepository({ Role });
    const expected = await _roleRepository.delete(role._id);

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
  });
});
