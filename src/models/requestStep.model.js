const mongoose = require("mongoose");
const { Schema } = mongoose;
const { StatusHelper } = require("../helpers");

const RequestStepSchema = new Schema(
  {
    request: { type: Schema.Types.ObjectId, ref: "Request" },
    step: { type: Schema.Types.ObjectId, ref: "Step" },
    complete: { type: Boolean },
    status: { type: String, default: StatusHelper.ACTIVE }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestStep", RequestStepSchema);
