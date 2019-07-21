const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDetailSchema = new Schema({
  name: { type: String },
  lastname: { type: String },
  address: { type: String },
  birthday: { type: Date },
  status: { type: String }
});

module.exports = mongoose.model("UserDetail", UserDetailSchema);
