const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestFormValueSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "FormType",
      required: true
    },
    value: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("RequestFormValue", RequestFormValueSchema);
