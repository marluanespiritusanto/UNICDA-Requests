const { AuthService } = require("../../../src/services");
const { UserRepositoryMock } = require("../../mocks");

const {
  UserModelMock: { user }
} = require("../../mocks");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should signup an user", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getUserByUsername.mockReturnValue(null);
    UserRepository.create.mockReturnValue(user);

    const _authService = new AuthService({ UserRepository });
    const expected = await _authService.signUp({
      username: "marluanespiritusanto",
      email: "marluan@test.com",
      password: "mysecretpassword"
    });

    expect(expected).toMatchObject(user);
  });

  it("Should throw an error trying to create an existing user", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getUserByUsername.mockReturnValue(user);
    UserRepository.create.mockReturnValue(user);

    const _authService = new AuthService({ UserRepository });

    expect(
      _authService.signUp({
        username: "marluanespiritusanto",
        email: "marluan@test.com",
        password: "mysecretpassword"
      })
    ).rejects.toThrow(Error);
  });

  // it("Should login a user", async () => {
  //   const UserRepository = UserRepositoryMock;
  //   UserRepository.getUserByUsername.mockReturnValue(user);

  //   const _authService = new AuthService({ UserRepository });
  //   const expected = await _authService.signIn({
  //     username: user.username,
  //     password: user.password
  //   });

  //   console.log(expected);

  //   expect(expected).toBeTruthy();
  // });
});
