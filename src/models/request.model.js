const mongoose = require("mongoose");
const { Schema } = mongoose;
const { StatusHelper } = require("../helpers");

const RequestSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    status: { type: String, default: StatusHelper.ACTIVE }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Request", RequestSchema);
