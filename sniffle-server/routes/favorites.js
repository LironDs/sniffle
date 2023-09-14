const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Favorite = require("../models/Favorite");
const Card = require("../models/Card");

////update fav
router.post("/", auth, async (req, res) => {
  try {
    ///Check if user have favCards array
    let userFav = await Favorite.findOne({ userId: req.payload._id });
    if (!userFav)
      res.status(400).json({
        status: "error",
        action: "add",
        message: "No user Fav",
      });
    ///check if card in favCards
    let cardIndex = userFav.favCards.indexOf(req.body._id);
    console.log("2. cardIndex.............", cardIndex);

    // If card is in fav, remove it
    if (cardIndex !== -1) {
      userFav.favCards.splice(cardIndex, 1);
      await userFav.save();
      return res.status(200).json({
        status: "success",
        action: "remove",
        message: "Card removed from fav",
      });

      ////if it isn't-add it
    } else {
      userFav.favCards.push(req.body._id);
      await userFav.save();
      return res.status(201).json({
        status: "success",
        action: "add",
        message: "Card added to favorites",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      action: "unknown",
      message: "An error occurred",
    });
  }
});

///get user fav by userId
router.get("/", auth, async (req, res) => {
  try {
    ///check if id match
    let fav = await Favorite.findOne({ userId: req.payload._id });
    if (!fav) return res.status(400).send("user not found");
    let favCards = fav.favCards;
    const cards = await Card.find({ _id: { $in: favCards } });
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
