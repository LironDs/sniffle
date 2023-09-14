const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Favorite = require("../models/Favorite");
const User = require("../models/User");

const userSchema = joi.object({
  firstName: joi.string().required().min(2),
  middleName: joi.string().min(0),
  lastName: joi.string().required().min(2),
  phone: joi.string().required().min(8),
  email: joi.string().required().email().min(2),
  password: joi.string().required().min(8),
  imageUrl: joi.string().required().min(8),
  imageAlt: joi.string().required().min(2),
  state: joi.string().min(0),
  country: joi.string().required().min(2),
  city: joi.string().required().min(2),
  street: joi.string().required().min(2),
  houseNumber: joi.string().required().min(1),
  zip: joi.number().min(0),
  role: joi.string().required(),
});

router.post("/", async (req, res) => {
  try {
    ///1. joi validation
    console.log(req.body);
    console.log(typeof req.body.houseNumber);

    const { error } = userSchema.validate(req.body);

    if (error) return res.status(400).send(error);
    ///2. check if user already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");
    ///3.create the user
    user = new User(req.body);
    console.log(typeof user.houseNumber);
    ///4.encrypt the password
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    // 5. create user favorite
    let favorite = new Favorite({ userId: user._id, favCards: [] });
    await favorite.save();
    // /create token and response
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.jwtKey
    );
    console.log("test");
    ///5. return response with token
    res.status(201).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
