const { UserService } = require("../../../src/services");
const { UserRepositoryMock } = require("../../mocks");
const {
  UserModelMock: { user, users }
} = require("../../mocks");

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should find a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.get.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getUser(user._id);
    expect(expected).toMatchObject(user);
  });

  it("Should find a user by username", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getUserByUsername.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getUserByUsername(user.username);
    expect(expected).toMatchObject(user);
  });

  it("Should return a user collection", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getAll.mockReturnValue(users);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getAllUsers();
    expect(expected).toMatchObject(users);
  });

  it("Should create a user", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.create.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.createUser(user);
    expect(expected).toMatchObject(user);
  });

  it("Should update a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.update.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.updateUser(user._id, user);
    expect(expected).toMatchObject(user);
  });

  it("Should delete a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.update.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.updateUser(user._id);
    expect(expected).toMatchObject(user);
  });
});
