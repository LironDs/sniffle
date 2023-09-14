const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Favorite = require("../models/Favorite");
const User = require("../models/User");
const card = require("../models/Card");
const auth = require("../middlewares/auth");

const userSchema = joi.object({
  firstName: joi.string().required().min(2),
  middleName: joi.string().min(2),
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

//get all users
router.get("/", auth, async (req, res) => {
  try {
    const checkUser = req.payload.role;
    if (!checkUser === "admin") return res.status(400).send("You are not authorized");
    let users = await User.find();
    if (!users) return res.status(400).send("No users");
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

///get user by _id
router.get("/:_id", auth, async (req, res) => {
  try {
    console.log(req.params._id);
    ////1. check user details
    const user = await User.findById(req.params._id);
    if (!user) return res.status(400).send("No such user");

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

///edit userProfile by user or Admin
router.put("/:_id", auth, async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send("userSchema error");

    let userToUpdate = await User.findById(req.params._id);

    ///check if user exist
    if (!userToUpdate) {
      res.status(400).send("No such user");
    }
    // Check if user is authorized to update the userProfile
    if (!(req.payload._id === req.params._id || req.payload.role === "admin")) {
      return res.status(403).send("Permission denied");
    }
    console.log("all OK");

    // joi validation for body

    userToUpdate = await User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
    res.status(200).send(userToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
});

////delete user by admin
router.delete("/:_id", auth, async (req, res) => {
  try {
    ///check if admin
    const checkAdmin = req.payload.role;
    if (checkAdmin !== "admin") return res.status(403).send("You are not authorized");
    ///check if user exist
    const userToDelete = await User.findByIdAndDelete({
      _id: req.params._id,
    });
    if (!userToDelete) return res.status(400).send("No such user");
    res.status(200).send("user removed");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
