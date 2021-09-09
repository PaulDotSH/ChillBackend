const express = require("express");
//Modify mby
const User = require("../models/User");

const router = express.Router();

//TODO: Add some kind auth
router.get("/", (req, res) => {
  console.log("Get request to /upload");
});

//TODO: Add only if user doesnt exist or user exists and the details sent dont
//(if user exists and has discord details but you send browser details add them)
router.post("/", (req, res) => {
  console.log(req.body);
  if (
    Object.keys(req.body.IP).length === 0 ||
    Object.keys(req.body.UUID).length === 0
  ) {
    res.send("ok");
    return;
  }

  const user = new User({
    UUID: req.body.UUID,
    IP: req.body.IP,
  });
  let save = false;

  if (checkParam(req.body.discordInfo)) {
    user.discordInfo = req.body.discordInfo;
    save = true;
  }

  if (!save) {
    res.send("ok");
    return;
  }

  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("Err: " + err);
      res.json(err);
    });
});

function checkParam(p) {
  return p && Object.keys(p).length !== 0;
}

module.exports = router;
