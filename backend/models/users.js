const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists."],
    lowercase: true,
    trim: true,
    required: [true, "No email provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  }
});

UserSchema.methods.isPasswordMatch = function (userPassword, callback) {
  bcrypt.compare(userPassword, this.password, function (err, match) {
    if (err) {
      callback(err);
    } else {
      callback(err, match);
    }
  });
};

module.exports = mongoose.model("users", UserSchema);
