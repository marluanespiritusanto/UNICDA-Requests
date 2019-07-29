const { AuthService } = require("../../../src/services");
const { AuthRepositoryMock } = require("../../mocks");

const {
  UserModelMock: { user }
} = require("../../mocks");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should signup an user", async () => {
    const AuthRepository = AuthRepositoryMock;
    AuthRepository.signUp.mockReturnValue(user);

    const _authService = new AuthService({ AuthRepository });
    const expected = await _authService.signUp({
      username: "marluanespiritusanto",
      email: "marluan@test.com",
      password: "mysecretpassword"
    });
    expect(expected).toMatchObject(user);
  });

  // it("Should find a role by id", async () => {
  //   const RoleRepository = RoleRepositoryMock;
  //   RoleRepository.getRoleByName.mockReturnValue(role);

  //   const _roleService = new RoleService({ RoleRepository });
  //   const expected = await _roleService.getRoleByName(role._id);
  //   expect(expected).toMatchObject(role);
  // });
});
