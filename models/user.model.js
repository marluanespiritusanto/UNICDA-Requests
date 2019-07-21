const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  details: {
    type: Schema.Types.ObjectId,
    ref: "UserDetail",
    required: true,
    default: {}
  },
  status: { type: String }
});

module.exports = mongoose.model("User", UserSchema);
