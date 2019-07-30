const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { StatusHelper } = require("../helpers");

const RequestHistorychema = new Schema(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "Request",
      required: true
    },
    status: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestHistory", RequestHistorychema);
