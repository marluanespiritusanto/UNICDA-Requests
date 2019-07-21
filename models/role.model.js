const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String },
  description: { type: String },
  status: { type: String }
});

module.exports = mongoose.model("Role", RoleSchema);
