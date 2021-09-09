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
router.post("/", async (req, res) => {
  //console.log(req.body);
  console.log(
    `IP: ${checkParam(req.body.IP)} UUID: ${checkParam(
      req.body.UUID
    )} DisInfo: ${checkParam(req.body.discordInfo)}`
  );
  if (!checkParam(req.body.IP) || !checkParam(req.body.UUID)) {
    res.send("ok");
    return;
  }

  const foundUser = await User.findOne({ UUID: req.body.UUID });
  console.log(foundUser);
  //If user is found, check for params and update missing info if possible
  if (foundUser) {
    console.log("user exists");
    if (checkParam(req.body.discordInfo) && !foundUser.discordInfo) {
      try {
        console.log("updating user");
        const updatedUser = await User.updateOne(
          { UUID: req.body.UUID },
          { $set: { discordInfo: req.body.discordInfo } }
        );
        res.sendStatus(200);
      } catch (err) {
        console.log(
          `Error ${err} when updating user with UUID: ${req.body.UUID}`
        );
        res.sendStatus(500);
      }
    }
  } else {
    //Add the user to the DB
    const user = new User({
      UUID: req.body.UUID,
      IP: req.body.IP,
    });
    let save = false;

    if (checkParam(req.body.discordInfo)) {
      user.discordInfo = req.body.discordInfo;
      save = true;
    }
    //Add checks for other stuff like browserInfo

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
  }
  console.log(`FoundUser: ${foundUser}`);
});

function checkParam(p) {
  return p && Object.keys(p).length !== 0;
}

module.exports = router;
