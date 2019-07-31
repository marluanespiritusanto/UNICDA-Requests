const mongoose = require("mongoose");
const { Schema } = mongoose;
const { StatusHelper } = require("../helpers");

const StepSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    roleOfficer: { type: Schema.Types.ObjectId, ref: "Role" },
    status: { type: String, default: StatusHelper.ACTIVE }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Step", StepSchema);
