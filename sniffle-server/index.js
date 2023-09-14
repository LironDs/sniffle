const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("morgan");

const cors = require("cors");

const register = require("./routes/register");
const login = require("./routes/login");
const cards = require("./routes/cards");
const users = require("./routes/users");
const favorites = require("./routes/favorites");

const app = express();

const port = process.env.PORT || 10001;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.listen(port, () => console.log("server started at port: ", port));

app.use(express.json());
app.use(cors());
app.use(logger("common"));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/cards", cards);
app.use("/api/users", users);
app.use("/api/favorites", favorites);
