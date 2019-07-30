const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestFormSchema = new Schema(
  {
    formTypeId: {
      type: Schema.Types.ObjectId,
      ref: "FormType",
      required: true
    },
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "RequestType",
      required: true
    },
    label: { type: String },
    value: { type: String },
    status: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestForm", RequestFormSchema);
