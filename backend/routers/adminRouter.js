//-------------- EXPRESS AND MONGOOSE---------------//
/*eslint-disable */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");

//--------------- AUTH ----------------//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//------------- SECRET --------------//
const secret = process.env.SECRET;

//------------ MODELS -----------------//
const User = require("../models/UserModel");
const Book = require("../models/BookModel");
//------------ MIDDLEWARES -----------------//
const {
    checkIfAdmin,
    auth,
    joiBookValidation
} = require("../middlewares/userMW");
/*eslint-enable */

//---------------------------------- ROUTES -------------------------------------//


//---------------------------- USERS PARAMETERS //------------------------------//
//-----------------------------------------------------------------------------//

//-------------------GET THE IMAGE UPLOADS INFOS: ---------------------//

router.get("/upload-image/:imagePath", auth, checkIfAdmin, async (req,res) => {
    const imagePath = { name: "img.png", lastModified: 1662997316430, webkitRelativePath: "", size: 137708, type: "image/png" }
    console.log(imagePath)
    axios
      .post(`https://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5&source=${imagePath}&format=json`)
      .then(resp => {
        if (resp.data.success) {
            return res.json({ success: true, imageInfos: res.data})
        }
      })
      .catch(error => {
        return res.json({ error })
      })
    return null
})

// --------------------- GET THE LIST OF USERS ---------------------
router.get("/user-list", auth, checkIfAdmin, async (_req,res) => {
    let usersList;

    try {
        usersList = await User.find();
    } catch (error) {
       return res.status(400).json({ message: "Bad Request.", error: true });
    }
    return res.json({success: true, usersList});
});
// ---------------- DELETE A USER'S ACCOUNT -----------------------
router.delete("/user-list",auth, checkIfAdmin, async (req,res) => {
    /*eslint-disable */
    let deletedUser, usersList, userId = req.body.userId;
    
    try {
        deletedUser = await User.findByIdAndDelete(userId);
        /*eslint-enable */
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Bad Request.", error: true });
    }
    try {
        usersList = await User.find();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Bad Request.", error: true });
    }
    return res.status(200)
              .json({ 
                success: true, 
                message: "User successfully deleted!", 
                usersList 
              });
});
// ---------------- UPDATE A USER'S ACCOUNT -----------------------

router.put("/user-list", auth, checkIfAdmin, async (req, res) => {
    let updatedUser;
    const { id } = req.body;

    try {
        updatedUser = await User.findByIdAndUpdate({_id: id}, {
        ...req.body.updatedUser,
      }, {new: true});
    } catch (error) {
      return res.status(400).json({ message: "Bad request."});
    }
    
    return res.status(200)
              .json({ 
                success: true, 
                message: "User successfully updated!", 
                updatedUser
              });
});

//---------------------------- BOOKS PARAMETERS //------------------------------//
//-----------------------------------------------------------------------------//


//----------------------- ADD A BOOK TO SEMA'S LIBRARY //-------------------------//
router.post("/booklist", auth, checkIfAdmin,joiBookValidation, async (req,res) => {
    
    const newBook = req.body.newBook;
    let addedBook;
    
    try {
        addedBook = await Book.create(newBook);
        addedBook = await Book.findById(addedBook._id);
    }catch (error){
        console.log(error);
        return res.status(400).json({ message: "Bad request."}) ;
    }
    return res.status(201).json({success: true, message: "Book successfully created!", addedBook});
});

//--------------------- DELETE A BOOK FROM SEMA'S LIBRARY //----------------------//
router.delete("/booklist", auth, checkIfAdmin, async (req,res) => {
    const bookToDeleteID = req.body.bookToDeleteID;
    let deletedBook, bookList;
    try {
        /*eslint-disable */
        deletedBook = await Book.findByIdAndDelete(bookToDeleteID);
        /*eslint-enable */
        bookList = await Book.find();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Bad request."}); 
    }
    return res.status(201).json({success: true, message: "Book successfully deleted!", bookList});
});
//--------------------- UPDATE A BOOK FROM SEMA'S LIBRARY //----------------------//
router.put("/booklist", auth, checkIfAdmin, async (req, res) => {
    let updatedBook;
    const { id } = req.body;

    try {
        updatedBook = await Book.findByIdAndUpdate({_id: id}, {
        ...req.body.updatedBook,
      }, {new: true});
      updatedBook = await Book.findById(id);
    } catch (error) {
      return res.status(400).json({ message: "Bad request."});
    }
    
    return res.status(200)
        .json({ 
        success: true, 
        message: "Book successfully updated!", 
        updatedBook
    });
});

module.exports = router;
