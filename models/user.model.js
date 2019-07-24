const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const RoleService = require("../services/role.service");
const { StatusHelper, RoleHelper } = require("../helpers");

const UserSchema = new Schema(
  {
    name: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true, lowercase: true, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    birthday: { type: Date },
    picture: { type: String },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    status: { type: String, default: StatusHelper.ACTIVE }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

UserSchema.methods.toJSON = function() {
  let user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.pre("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;

  const generalRole = await RoleService.getRoleByName(RoleHelper.GENERAL);
  user.roles.push(generalRole);

  next();
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
