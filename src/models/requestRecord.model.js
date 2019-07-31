const mongoose = require("mongoose");
const { Schema } = mongoose;
const { StatusHelper } = require("../helpers");

const RequestRecordSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    request: {
      type: Schema.Types.ObjectId,
      ref: "Request",
      required: true
    },
    status: { type: String, default: StatusHelper.APPROVE_PENDING }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestRecord", RequestRecordSchema);
