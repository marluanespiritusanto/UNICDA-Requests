const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { StatusHelper } = require("../helpers");

const RequestHistorychema = new Schema(
  {
    requestStep: {
      type: Schema.Types.ObjectId,
      ref: "RequestStep",
      required: true
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    completed: { type: Boolean, required: false },
    requestRecord: {
      type: Schema.Types.ObjectId,
      ref: "RequestRecord",
      required: true
    },
    status: { type: String, default: StatusHelper.INACTIVE }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestHistory", RequestHistorychema);
