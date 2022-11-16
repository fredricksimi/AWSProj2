const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    bio: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsScehma);
