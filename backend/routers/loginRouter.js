//-------------- EXPRESS ---------------//
const express = require("express");
const router = express.Router();
//----------------- CORS ---------------//
const cors = require("cors");
//--------------- AUTH ----------------//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//------------- SECRET --------------//
const secret = process.env.SECRET;

//------------ MODEL -----------------//
const User = require("../models/UserModel");

//------------- ROUTE ---------------//
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  //* 1- Check user's email
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return res.json({ message: "A problem happened." });
  }

  if (!user) {
    return res.status(401).json({
      message: "Incorrect email or password",
      error: true,
    });
  }
  //* 2 - Check user's password and compare it to hash in database

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Incorrect email or password",
      error: true,
    });
  }

  //* 3 - Authentification
  // *! 3.1 - Generate a token with jsonwebtoken
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "30d" }); 
  // *! 3.2 - Store token in a cookie called "jwt" and send it to client in response with a message of successful login
  return res
    .cookie("jwt", token, { httpOnly: false, secure: false })
    .status(200)
    .json({ success: true, message: "You logged in successfully", user });
});

module.exports = router;