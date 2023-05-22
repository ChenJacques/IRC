const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  title: {
    type: String,
    required: "Name is required!",
  },
  title: {
    type: String,
    required: "Name is required!",
  },
});

module.exports = mongoose.model("Room", roomSchema);
