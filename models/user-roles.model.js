const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  status: { type: String }
});

module.exports = mongoose.model("UserRole", UserRoleSchema);
