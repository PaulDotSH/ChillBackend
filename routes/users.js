const express = require("express");
const User = require("../models/User");
const router = express.Router();

//TODO: Add some kind of auth
router.get("/", async (req, res) => {
  console.log("Get request to /users");
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:UUID", async (req, res) => {
  try {
    const foundUser = await User.findOne({ UUID: req.params.UUID });
    res.send(foundUser);
  } catch (err) {
    console.log(`Error ${err} when finding user ${req.params.UUID}`);
    res.sendStatus(500);
  }
});

router.delete("/:UUID", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ UUID: req.params.UUID });
    res.send("ok");
  } catch (err) {
    console.log(`Error ${err} when removing user ${req.params.UUID}`);
    res.sendStatus(500);
  }
});

module.exports = router;
