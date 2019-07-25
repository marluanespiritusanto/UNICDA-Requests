const { User } = require("../models");
const { StatusHelper } = require("../helpers");

class UserRepository {
  async get(id) {
    const user = await User.findOne({
      _id: id,
      status: StatusHelper.ACTIVE
    })
      .populate("details")
      .populate("roles", "name");

    return user;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({ username })
      .populate("details")
      .populate("roles", "name");

    return user;
  }

  async getAll() {
    const users = await User.find({ status: StatusHelper.ACTIVE })
      .populate("roles", "name")
      .populate("details");

    return users;
  }

  async create(user) {
    const createdUser = await User.create([user]);
    return createdUser;
  }

  async update(id, user) {
    const { username } = user;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );

    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await User.findByIdAndRemove(id);
    return deletedUser;
  }
}

module.exports = new UserRepository();
