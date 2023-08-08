const mongoose = require("mongoose");

const FriendsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const FriendModel = mongoose.model("friends", FriendsSchema);

module.exports = FriendModel;
