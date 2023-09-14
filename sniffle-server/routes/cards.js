const express = require("express");
const router = express.Router();
const joi = require("joi");
const Card = require("../models/Card");
const auth = require("../middlewares/auth");

const cardSchema = joi.object({
  userId: joi.string().required(),
  title: joi.string().required().min(2),
  subTitle: joi.string().required().min(2),
  description: joi.string().required().min(2),
  phone: joi.string().required().min(9),
  email: joi.string().email().required(),
  web: joi.string().required().min(8),
  imageUrl: joi.string(),
  imageAlt: joi.string(),
  imageAlt: joi.string().required().min(2),
  state: joi.string().min(0),
  country: joi.string().required().min(2),
  city: joi.string().required().min(2),
  street: joi.string().required().min(2),
  houseNumber: joi.string().required().min(1),
  zip: joi.number().min(0),
});

///get all cards- no need for Authorization
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

////get cards by userId
router.get("/search/:userId", auth, async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.params.userId });
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Add card by businessUser or admin
router.post("/", auth, async (req, res) => {
  try {
    ///check if not admin or business user
    const checkUser = req.payload.role;
    if (checkUser === "user") return res.status(400).send("You are not authorized");
    // 1. joi validation for body
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error);
    let card = await Card.findOne({
      title: req.body.title,
      subTitle: req.body.subTitle,
    });
    if (card) return res.status(400).send("Card already exist");
    card = new Card({ userId: req.payload._id, ...req.body });
    await card.save();
    res.status(201).send("Card added");
  } catch (error) {
    res.status(400).send(error);
  }
});

////get card by id-no need for Authorization
router.get("/:_id", async (req, res) => {
  try {
    const card = await Card.findById(req.params._id);
    if (!card) return res.status(400).send("No such card");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete card by userId or admin
router.delete("/:_id", auth, async (req, res) => {
  try {
    const cardId = req.params._id;
    const userId = req.payload._id;
    const userRole = req.payload.role;
    const cardToDelete = await Card.findById(cardId);
    ///check if card exist
    if (!cardToDelete) {
      res.status(400).send("No such card");
    }
    // Check if user is authorized to delete the card
    if (cardToDelete.userId !== userId && userRole !== "admin") {
      return res.status(403).send("Permission denied");
    }
    // Delete the card
    await cardToDelete.deleteOne();
    res.status(201).send("Card deleted");
  } catch (error) {
    res.status(400).send("catch error");
  }
});

///update Card by admin or userId

router.put("/:_id", auth, async (req, res) => {
  try {
    ///joi validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error);
    ////find card
    let cardToUpdate = await Card.findById(req.params._id);
    if (!cardToUpdate) return res.status(400).send("No such card");

    ////check if admin or user
    if (!(cardToUpdate.userId === req.payload.userId || req.payload.role === "admin")) {
      return res.status(401).send("You are not authorized to update this card");
    }

    ///find card again and update
    await Card.findOneAndUpdate(
      { _id: req.params._id },

      req.body,

      { new: true }
    );
    res.status(201).send("card updated");
  } catch (error) {
    console.error(error);
    res.status(400).send("catch error");
  }
});

module.exports = router;
