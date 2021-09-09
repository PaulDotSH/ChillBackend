const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  UUID: {
    type: String,
    required: true,
  },
  IP: {
    type: String,
    required: true,
  },
  //DiscordInfo: Object,
  discordInfo: {
    type: Object,
    default: undefined,
  },
});

module.exports = mongoose.model("User", UserSchema);
