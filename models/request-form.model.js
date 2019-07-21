const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestFormSchema = new Schema({
  formTypeId: { type: Schema.Types.ObjectId, ref: "FormType", required: true },
  requestTypeId: {
    type: Schema.Types.ObjectId,
    ref: "RequestType",
    required: true
  },
  label: { type: String },
  value: { type: String },
  status: { type: String }
});

module.exports = mongoose.model("RequestForm", RequestFormSchema);
