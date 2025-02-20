const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecretKey = process.env.JWT_KEY;

const saltround = 10;

async function registerHandeler(req, res) {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(405).send("user already registerd");
    } else {
      bcrypt.hash(password, saltround, async (err, hash) => {
        const user = new User({ username, password: hash, email });
        await user.save();
        res.status(201).json({ message: "User successfully added", user });
      });
    }
  } catch (error) {
    res.status(400).send(`Invalid request: ${error.message}`);
  }
}

async function loginHandeler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("invalid username");
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          res.status(400).send("invalid password");
        } else {
          const username = user.username;
          const token = jwt.sign({ email, username }, jwtSecretKey);
          res.status(200).json({ message: `Welcome ${user.username}`, token });
        }
      });
    }
  } catch (error) {
    res.status(400).send(`Invalid request: ${error.message}`);
  }
}

module.exports = { registerHandeler, loginHandeler };
