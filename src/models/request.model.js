const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestSchema = new Schema(
  {
    requestTypeId: {
      type: Schema.Types.ObjectId,
      ref: "RequestType",
      required: true
    },
    status: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Request", RequestSchema);
