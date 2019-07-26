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
    const expected = await _roleRepository.get("507f191e810c19729de860ea");

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
  });

  it("Should return a role by its name", async () => {
    mockingoose(Role).toReturn(role, "findOne");
    const _roleRepository = new RoleRepository({ Role });
    const expected = await _roleRepository.getRoleByName("ADM_IN");

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
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
    const expected = await _roleRepository.update("507f191e810c19729de860ea", {
      name: "BACK_OFFICE"
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
  });

  it("Should delete an especific role by id", async () => {
    mockingoose(Role).toReturn(role, "findOneAndDelete");
    const _roleRepository = new RoleRepository({ Role });
    const expected = await _roleRepository.delete("507f191e810c19729de860ea");

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(role);
  });
});
