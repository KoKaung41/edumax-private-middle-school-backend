const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  title: { type: String, require: true },
  subTitle: { type: String, require: true },
  description: { type: String, require: true },
  img: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Project", projectSchema);
