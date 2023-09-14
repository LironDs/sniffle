const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  middleName: {
    type: String,
    minlength: 0,
    required: false,
  },
  lastName: {
    type: String,
    minlength: 2,
    required: true,
  },
  phone: {
    type: String,
    minlength: 9,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
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
  role: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
