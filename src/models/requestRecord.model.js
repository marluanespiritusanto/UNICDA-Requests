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
    requestFormValue: [
      { type: Schema.Types.ObjectId, ref: "RequestFormValue" }
    ],
    status: { type: String, default: StatusHelper.APPROVE_PENDING },
    createdTime: {
      type: String,
      default: new Date().toLocaleString("en-US", {
        timeZone: "America/Santo_Domingo"
      })
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestRecord", RequestRecordSchema);
