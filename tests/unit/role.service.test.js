const { RoleRepository } = require("../../src/repositories");
const mockingoose = require("mockingoose").default;
const { Role } = require("../../src/models");

describe("Role Service", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it("should find a role", async () => {
    const role = {
      _id: 1,
      name: "GENERIC",
      status: "ACTIVE"
    };

    mockingoose(Role).toReturn(role, "findOne");

    const _roleRepository = new RoleRepository({ Role });

    expect((await _roleRepository.get(1)).name).toBe(role.name);
  });
});
