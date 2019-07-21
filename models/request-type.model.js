const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestTypeSchema = new Schema({
  name: { type: String },
  description: { type: String },
  status: { type: String }
});

module.exports = mongoose.model("RequestType", RequestTypeSchema);
