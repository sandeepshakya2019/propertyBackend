const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: String, required: true },
});

module.exports = mongoose.model("Property", propertySchema);
