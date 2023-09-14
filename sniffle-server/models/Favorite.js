const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  favCards: {
    type: Array,
    required: true,
  },
});

const Favorite = mongoose.model("favorites", favSchema);

module.exports = Favorite;
