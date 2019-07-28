const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestTypeSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    status: { type: String, default: "ACTIVE" }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestType", RequestTypeSchema);
