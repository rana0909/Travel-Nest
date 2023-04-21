const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const UserRouter = express.Router();
const SALT = 9;

UserRouter.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let existingUser = await users.findOne({ email: email });
    if (existingUser) {
      return res.send("User already exists");
    }

    let salt = await bcrypt.genSalt(SALT);
    let hashPass = await bcrypt.hash(password, salt);
    const userCreadted = await users.create({
      name: name,
      email: email,
      password: hashPass,
    });

    const token = jwt.sign(
      { user_id: userCreadted._id, email },
      process.env.JWT_KEY,
      {
        expiresIn: "12h",
      }
    );
    userCreadted.token = token;

    return res.send(userCreadted);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

UserRouter.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await users.findOne({ email: email }).exec();
    if (user) {
      user.isPasswordMatch(password, (err, valid) => {
        if (valid) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_KEY,
            {
              expiresIn: "12h",
            }
          );
          user.token = token;
          res.send(user);
        } else res.send("Incorrect Password!");
      });
    } else {
      res.send("Invalid Email!");
    }
  } catch (err) {
    console.log(err);
  }
});

UserRouter.put("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let salt = await bcrypt.genSalt(SALT);
    let hashPass = await bcrypt.hash(password, salt);
    const updatedUserCreds = {
      password: hashPass,
    };
    await users.findOneAndUpdate({ email: email }, updatedUserCreds);
    let user = await users.find({ email: email }).exec();
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = UserRouter;
