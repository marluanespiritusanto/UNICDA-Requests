const { User, UserDetail } = require("../models");

class UserRepository {
  async get(id) {
    const user = await User.findById(id).populate("userDetail");
    return user;
  }

  async getByUsername(username) {
    const user = await User.findById({ username });
    return user;
  }

  async getAll() {
    const users = await User.find().populate("userDetail");
    return users;
  }

  async create(user) {
    const { email, username, password } = user;

    const detail = UserDetail.create();
    const createdUser = await User.create([
      {
        email,
        username,
        password,
        details: detail
      }
    ]);

    return createdUser;
  }

  async update(id, user) {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await User.findByIdAndRemove(id);
    return deletedUser;
  }
}

module.exports = new UserRepository();
