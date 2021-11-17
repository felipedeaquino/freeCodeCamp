const mongoose = require("../database/connect");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    exercises: [
      {
        description: String,
        duration: Number,
        date: String,
      },
    ],
  })
);
