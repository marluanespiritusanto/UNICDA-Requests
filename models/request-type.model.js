const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestTypeSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    status: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestType", RequestTypeSchema);
