const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDetailSchema = new Schema(
  {
    name: { type: String },
    lastname: { type: String },
    address: { type: String },
    birthday: { type: Date },
    picture: { type: String },
    status: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("UserDetail", UserDetailSchema);
