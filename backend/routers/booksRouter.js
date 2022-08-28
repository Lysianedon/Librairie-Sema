//-------------- EXPRESS ---------------//
/*eslint-disable */
const express = require("express");
const router = express.Router();

//--------------- AUTH ----------------//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//------------- SECRET --------------//
const secret = process.env.SECRET;

//------------ MODELS -----------------//
const Book = require("../models/BookModel");
/*eslint-enable */

//--------------------------------- ROUTES ---------------------------------//

// ------------------- GET THE LIST OF BOOKS -----------------------------//

router.get("/", async (req,res) => {
    let bookList;
    
    try {
        bookList = await Book.find();
    } catch (error) {
        return res.status(400).json({ message: "An error happened.", error});
    }
    return res.status(200).json({success: true, bookList});
});

// ------------------- GET A BOOK -----------------------------//
router.get("/:selectedbook", async (req,res) => {
    const bookId = req.params.selectedbook
    //Decoding URL's params (book title):
    // const decodedTitle = decodeURI(req.params.selectedbook);
    // let selectedBook;
    // const encoded = encodeURI(str)
    // console.log(decodeURI(encoded));
    try {
        selectedBook = await Book.findById(bookId);
    } catch (error) {
        return res.status(400).json({ message: "An error happened.", error});
    }
    return res.status(200).json({success: true, selectedBook});
});

module.exports = router;