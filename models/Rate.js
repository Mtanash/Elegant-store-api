const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  value: { type: Number, min: 0 },
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  product: { type: mongoose.SchemaTypes.ObjectId, ref: "product" },
});

const Rate = mongoose.model("rate", rateSchema);

module.exports = Rate;
