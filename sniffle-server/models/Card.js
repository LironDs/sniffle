const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 2,
  },
  subTitle: {
    type: String,
    required: true,
    min: 2,
  },
  description: {
    type: String,
    required: true,
    min: 2,
  },
  phone: {
    type: String,
    required: true,
    min: 9,
  },
  email: {
    type: String,
    required: true,
    min: 2,
    unique: true,
  },
  web: {
    type: String,
  },
  imageUrl: {
    type: String,
    minlength: 8,
    required: true,
  },
  imageAlt: {
    type: String,
    minlength: 2,
    required: true,
  },
  state: {
    type: String,
    minlength: 0,
    required: false,
  },
  country: {
    type: String,
    minlength: 2,
    required: true,
  },
  city: {
    type: String,
    minlength: 2,
    required: true,
  },
  street: {
    type: String,
    minlength: 2,
    required: true,
  },
  houseNumber: {
    type: String,
    minlength: 1,
    required: true,
  },
  zip: {
    type: Number,
    minlength: 0,
    required: false,
  },
});

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
