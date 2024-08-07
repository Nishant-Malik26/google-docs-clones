const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //   password: {
  //     type: String,
  //     required: true,
  //   },
  //   avatar: {
  //     type: String,
  //     required: true,
  //   },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
