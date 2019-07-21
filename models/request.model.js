const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  requestTypeId: {
    type: Schema.Types.ObjectId,
    ref: "RequestType",
    required: true
  },
  status: { type: String }
});

module.exports = mongoose.model("Request", RequestSchema);
