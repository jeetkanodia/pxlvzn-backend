const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

//login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // create a token
    const token = createToken(user._id);

    // add token to user
    const userWithToken = { ...user._doc, token };

    res.status(200).json({ user: userWithToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.signup(email, password, username);

    // create a token
    const token = createToken(user._id);

    // add token to user
    const userWithToken = { ...user._doc, token };

    res.status(200).json({ user: userWithToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
//
