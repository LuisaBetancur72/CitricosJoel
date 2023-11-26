const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  new_password: String,
  documentType: String,
  document: String,
  role: String,
  active: Boolean,
  phone: String,
  avatar: String
});

module.exports = mongoose.model("User", UserSchema);
