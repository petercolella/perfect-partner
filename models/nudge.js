const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nudgeSchema = new Schema({
  name: { type: String, required: true },
  nudgeFrequency: { type: Number, required: true },
  textMessage: { type: String, required: true }
});


const Nudge = mongoose.model("Nudge", nudgeSchema);

module.exports = Nudge;
