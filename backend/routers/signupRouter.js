//-------------- EXPRESS ---------------//
const express = require("express");
const router = express.Router();

//--------------- AUTH ----------------//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//------------- SECRET --------------//
const secret = process.env.SECRET;

//------------ MODEL -----------------//
const User = require("../models/UserModel");
//------------ MIDDLEWARES -----------------//
const {
    checkIfUserExists, 
    joiUserValidation,
    joiUserPartialValidation
} = require("../middlewares/userMW");

//--------------------------- ROUTES ---------------------------------//

// ------------------- CREATE A NEW USER -----------------------------//
router.post('/',joiUserPartialValidation, checkIfUserExists, async (req,res) => {
    //Check if user already exists:
    const email = req.body.email, userExists = req.userExists;
    let newUser = req.body;

    if (userExists) {
        return res.status(400).json({error: true, message: "Email already exists"})
    }

    //Hashing password:
    let userPassword = newUser.password;
    userPassword = await bcrypt.hash(userPassword, 10)
    newUser.password = userPassword

    try {
        newUser = await User.create(newUser);
    } catch (error) {
        return res.status(400).json({ message: "An error happened.", error})
    }

    //Adding user's infos in cookie:
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: "30d" })
    // *! 3.2 - Store token in a cookie called "jwt" and send it to client in response with a message of successful login
    return res
      .cookie("jwt", token, { httpOnly: false, secure: false })
      .status(201)
      .json({ success: true, message: "User successfully created and logged in", newUser })
})

module.exports = router;