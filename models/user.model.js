const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const UserDetail = require("./user-detail.model");
const { StatusHelper, RoleHelper } = require("../helpers");

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    details: {
      type: Schema.Types.ObjectId,
      ref: "UserDetail"
    },
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
  const { RoleService } = require("../services");

  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;

  const detail = new UserDetail();
  await detail.save();
  user.details = detail._id;

  const generalRole = await RoleService.getRoleByName(RoleHelper.GENERAL);
  user.roles.push(generalRole);

  next();
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
