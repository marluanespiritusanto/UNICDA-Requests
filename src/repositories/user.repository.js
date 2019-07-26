const { StatusHelper } = require("../helpers");

let _user = null;
class UserRepository {
  constructor({ User }) {
    _user = User;
  }

  async get(id) {
    const user = await _user
      .findOne({
        _id: id,
        status: StatusHelper.ACTIVE
      })
      .populate("details")
      .populate("roles", "name");

    return user;
  }

  async getUserByUsername(username) {
    const user = await _user
      .findOne({ username })
      .populate("details")
      .populate("roles", "name");

    return user;
  }

  async getAll() {
    const users = await _user
      .find({ status: StatusHelper.ACTIVE })
      .populate("roles", "name")
      .populate("details");

    return users;
  }

  async create(user) {
    const createdUser = await _user.create([user]);
    return createdUser;
  }

  async update(id, user) {
    const { username } = user;
    const updatedUser = await _user.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );

    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await _user.findByIdAndRemove(id);
    return deletedUser;
  }
}

module.exports = UserRepository;
