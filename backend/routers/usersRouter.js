//-------------- EXPRESS AND MONGOOSE---------------//
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//--------------- AUTH ----------------//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//------------- SECRET --------------//
const secret = process.env.SECRET;

//------------ MODEL -----------------//
const User = require("../models/UserModel");
const Book = require("../models/BookModel");
//------------ MIDDLEWARES -----------------//
const {
    joiValidateUserPreferences, 
    joiUserPartialValidation,
    auth, 
    addBookToAllBooksCategory,
    deleteBookFromAllBookCategory,
    checkIfBookAlreadyInList
} = require("../middlewares/userMW");

//---------------------------- ROUTES -------------------------------//

// ---------------------------- GET USER'S INFOS ---------------------
router.get('/', auth, async (req,res) => {
    let user = req.userId;
    try {
        user = await User.findById(user);
    } catch (error) {
       return res.status(400).json({ message: "Bad Request.", error: true });
    }
    return res.json({success: true, user});
})

// ---------------- UPDATE USER  ----------------
router.put('/', auth, joiUserPartialValidation, async (req,res) => {
    let updatedPreferences = req.body, updatedUser;
    const userId = req.userId;
    
    try {
        updatedUser = await User.findOneAndUpdate(
            { _id: userId},
            { ...req.body },
            {new: true}
            );
            
            if (updatedUser === null) {
                return res.status(404).json({ message: "User not found." });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Bad Request.", error: true });
        }
        return res.status(200).json({ success: true, updatedUser });
    }); 
    
// ---------------- GET USER'S PREFERENCES  ----------------
router.get('/preferences', auth, async (req,res) => {
    const userId = req.userId;
    let userPreferences;

    try {
        userPreferences = await User.findById(userId)
    } catch (error) {
      return res.status(404).json({ message: "User not found." });   
    }
    userPreferences = userPreferences.preferences;
    return res.status(200).json({success: true, userPreferences})
})

// ---------------- UPDATE USER'S PREFERENCES  ----------------
router.put('/preferences', auth, joiUserPartialValidation, async (req,res) => {
    let updatedPreferences = req.body, updatedUser;
    const userId = req.userId;
    
    try {
        updatedUser = await User.findOneAndUpdate(
            { _id: userId},
            { preferences: updatedPreferences },
            {new: true}
            );
            
            if (updatedUser === null) {
                return res.status(404).json({ message: "User not found." });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Bad Request.", error: true });
        }
        return res.status(200).json({ success: true, updatedUser });
    }); 
    
// ---------------- DELETE USER'S ACCOUNT ----------------
router.delete('/delete-account', auth, async (req,res) => {
    const userId = req.userId;
    let deletedUser;
    
    try {
        deletedUser = await User.findByIdAndDelete(userId);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Bad Request.", error: true });
    }
    return res.status(200).clearCookie("jwt").json({ success: true, deletedUser });
})
// ---------------- GET USER'S BOOKLIST CATEGORIES (THE 3 OF THEM) ----------------
router.get('/library', auth, async (req,res) => {
    const userId = req.userId;
    let userLibrary;
    try {
        userLibrary = await User.findById(userId)
        .populate({path: 'books.allBooks', model: 'Books'})
        .populate({path: 'books.alreadyRead', model: 'Books'})
        .populate({path: 'books.favorites', model: 'Books'});
    } catch (error) {
        return res.status(400).json({ error: true, message: "Bad Request." });   
    }
    userLibrary = userLibrary.books;
    return res.status(200).json({success: true, userLibrary})
})

// ---------------- GET USER'S PERSONAL LIBRARY ----------------
router.get('/library/allbooks', auth, async (req,res) => {
    const userId = req.userId;
    let userLibrary;
    try {
        userLibrary = await User.findById(userId).populate({path: 'books.allBooks', model: 'Books'});
    } catch (error) {
        return res.status(400).json({ error: true, message: "Bad Request." });   
    }
    userLibrary = userLibrary.books.allBooks;
    return res.status(200).json({success: true, userLibrary})
})

// ---------------- DELETE A BOOK IN USER'S LIBRARY ----------------
router.delete('/library/allbooks', auth, checkIfBookAlreadyInList, async (req,res) => {
    //GET BOOK ID AND DELETE IT :
    const userId = req.userId;
    let userLibrary, deletedBook = req.body.bookToDeleteID, updatedLibrary;
      
    //Guard
    if (!req.isBookAlreadyInAllBooksCategory) {
        return res.status(404).json({ error: true, message: "Book not found." });     
    }

    //Finding the user:
    try {
        userLibrary = await User.findById(userId)
    } catch (error) {
        return res.status(404).json({ error: true, message: "A problem occured." });   
        
    }
    //Selecting user's library:
    userLibrary = userLibrary.books.allBooks;
    //Removing ID of book to delete from user's library:
    updatedLibrary = userLibrary.filter( id => id.toString() !== deletedBook);
    
    try {
        userLibrary = await User.findByIdAndUpdate(userId, 
            {
                $set : {
                    'books.allBooks': updatedLibrary //Updating user's library in user Schema
                }
            }, {new: true}).populate({path: 'books.allBooks', model: 'Books'});
        } catch (error) {
            return res.status(400).json({ error: true, message: "Bad request." });   
        }
        userLibrary = userLibrary.books.allBooks;
        return res.status(200).json({success: true, userLibrary})
    })
    
// ---------------- ADD A BOOK IN USER'S LIBRARY ----------------
router.post('/library/allbooks', auth, checkIfBookAlreadyInList, async (req,res) => {
    //GET BOOK ID AND ADD IT :
    const userId = req.userId;
    let userLibrary, addedBook = req.body.bookToAddID, updatedLibrary;
    
    //Guard
    if (req.isBookAlreadyInAllBooksCategory === true) {
        return res.status(400).json({ error: true, alreadyInList: true, message: "Book already in the list !" });     
    }

    //Finding the user:
    try {
        userLibrary = await User.findById(userId)
    } catch (error) {
        return res.status(400).json({ error: true, message: "Bad request."  });     
    }
    //Selecting user's library:
    userLibrary = userLibrary.books.allBooks;
    //Adding the new book's ID to the library:
    updatedLibrary = [...userLibrary, mongoose.Types.ObjectId(addedBook)];

    try {
        userLibrary = await User.findByIdAndUpdate(userId, 
            {
                $set : {
                    'books.allBooks': updatedLibrary //Updating user's library in user Schema
                }
            }, {new: true}).populate({path: 'books.allBooks', model: 'Books'});
        } catch (error) {
            return res.status(400).json({ error: true, message: "Bad request."  });   
        }

    userLibrary = userLibrary.books.allBooks;
    return res.status(201).json({success: true, userLibrary})
})

// ---------------- ADD A BOOK IN USER'S FAVORITES CATEGORY ----------------
router.post('/library/favorites', auth, addBookToAllBooksCategory, checkIfBookAlreadyInList, async (req,res) => {
    //GET BOOK ID AND ADD IT :
    const userId = req.userId;
    let userFavoritesLibrary, addedBook = req.body.bookToAddID, updatedLibrary;
    
    //Guard
    if (req.isBookAlreadyInFavoritesCategory === true) {
        return res.status(400).json({ error: true, bookAlreadyInList: true, message: "Book already in the list !"});     
    }
    
    //Finding the user:
    try {
        userFavoritesLibrary = await User.findById(userId)
    } catch (error) {
        return res.status(400).json({ error: true, message: "Bad request."});     
    }
    //Selecting user's library:
    userFavoritesLibrary = userFavoritesLibrary.books.favorites;
    //Adding the new book's ID to the library:
    updatedLibrary = [...userFavoritesLibrary, mongoose.Types.ObjectId(addedBook)];

    try {
        userFavoritesLibrary = await User.findByIdAndUpdate(userId, 
            {
                $set : {
                    'books.favorites': updatedLibrary //Updating user's library in user Schema
                }
            }, {new: true}).populate({path: 'books.favorites', model: 'Books'});
        } catch (error) {
            return res.status(404).json({ error: true, message: "A problem occured."});   
    }
    userFavoritesLibrary = userFavoritesLibrary.books.favorites;
    return res.status(201).json({success: true, userFavoritesLibrary})
})

// ---------------- DELETE A BOOK IN USER'S FAVORITES CATEGORY ----------------
router.delete('/library/favorites', auth,checkIfBookAlreadyInList, async (req,res) => {
    //GET BOOK ID AND DELETE IT :
    const userId = req.userId;
    let userFavoritesLibrary, deletedBook = req.body.bookToDeleteID, updatedLibrary;
    
    //Guard
    if (!req.isBookAlreadyInFavoritesCategory) {
        console.log(req.isBookAlreadyInFavoritesCategory)
        return res.status(404).json({ error: true, bookNotFound: true, message: "Book not found." });     
    }

    //Finding the user:
    try {
        userFavoritesLibrary = await User.findById(userId)
    } catch (error) {
        return res.status(400).json({ error: true, message: "Bad request."});   
        
    }
    //Selecting user's "to read" category:
    userFavoritesLibrary = userFavoritesLibrary.books.favorites;
    //Removing ID of book to delete from user's "to read" category:
    updatedLibrary = userFavoritesLibrary.filter( id => id.toString() !== deletedBook);
    
    try {
        userFavoritesLibrary = await User.findByIdAndUpdate(userId, 
            {
                $set : {
                    'books.favorites': updatedLibrary //Updating user's library in user Schema
                }
            }, {new: true}).populate({path: 'books.favorites', model: 'Books'});
        } catch (error) {
            return res.status(400).json({ error: true, message: "Bad request."});   
        }
        userFavoritesLibrary = userFavoritesLibrary.books.favorites;
        return res.status(200).json({success: true, userFavoritesLibrary})
})

// ---------------- ADD A BOOK IN USER'S "ALREADY READ" CATEGORY ----------------
router.post('/library/alreadyread', auth, addBookToAllBooksCategory, checkIfBookAlreadyInList, async (req,res) => {
    //GET BOOK ID AND ADD IT :
    const userId = req.userId;
    let userAlreadyreadLibrary, addedBook = req.body.bookToAddID, updatedLibrary;
    
    //Guard
    if (req.isBookAlreadyInAlreadyReadCategory === true) {
        return res.status(400).json({ error: true, message: "Book already in the list !" });     
    }

    //Finding the user:
    try {
        userAlreadyreadLibrary = await User.findById(userId)
    } catch (error) {
        return res.status(400).json({ error: true, message: "Bad request."});     
    }
    //Selecting user's "already read" category:
    userAlreadyreadLibrary = userAlreadyreadLibrary.books.alreadyRead;
    //Adding the new book's ID to the "already read" category:
    updatedLibrary = [...userAlreadyreadLibrary, mongoose.Types.ObjectId(addedBook)];

    try {
        userAlreadyreadLibrary = await User.findByIdAndUpdate(userId, 
            {
                $set : {
                    'books.alreadyRead': updatedLibrary //Updating user's library in user Schema
                }
            }, {new: true}).populate({path: 'books.alreadyRead', model: 'Books'});
        } catch (error) {
            return res.status(400).json({ error: true, message: "Bad request."});   
    }
    userAlreadyreadLibrary = userAlreadyreadLibrary.books.alreadyRead;
    return res.status(201).json({success: true, userAlreadyreadLibrary})
})

// ---------------- DELETE A BOOK IN USER'S "ALREADY READ" CATEGORY ----------------
router.delete('/library/alreadyread', auth,checkIfBookAlreadyInList, deleteBookFromAllBookCategory, async (req,res) => {
    //GET BOOK ID AND DELETE IT :
    const userId = req.userId;
    let userAlreadyreadLibrary, deletedBook = req.body.bookToDeleteID, updatedLibrary;
    
    //Guard
    if (!req.isBookAlreadyInAlreadyReadCategory) {
        return res.status(404).json({ error: true, message: "Book not found." });     
    }

    //Finding the user:
    try {
        userAlreadyreadLibrary = await User.findById(userId)
    } catch (error) {
        return res.status(400).json({ error: true, message: "Bad request."});   
        
    }
    //Selecting user's "already read" category:
    userAlreadyreadLibrary = userAlreadyreadLibrary.books.alreadyRead;
    //Removing ID of book to delete from user's "already read" category:
    updatedLibrary = userAlreadyreadLibrary.filter( id => id.toString() !== deletedBook);
    
    try {
        userAlreadyreadLibrary = await User.findByIdAndUpdate(userId, 
            {
                $set : {
                    'books.alreadyRead': updatedLibrary //Updating user's library in user Schema
                }
            }, {new: true}).populate({path: 'books.alreadyRead', model: 'Books'});
        } catch (error) {
            return res.status(400).json({ error: true, message: "Bad request."});   
        }
        userAlreadyreadLibrary = userAlreadyreadLibrary.books.alreadyRead;
        return res.status(200).json({success: true, userAlreadyreadLibrary})
})

router.get('/library/personalised-suggestion', auth, async (req, res) => {

    //What we need:
    let userId = req.userId, 
        user, 
        userGoals, 
        userInterests, 
        userAge, 
        userLibrary, 
        semasListOfBooks, 
        personalisedSuggestion, 
        suggestionsArr;

    //Make a book suggestion based on :
    //-If not in user's library:
    //-interests: if exists, prioritize this category, otherwise: check goals
    //- age range, if answer === "no answer", random suggestion out of Sema's library (if existing ingo)
    
    try {
        user = await User.findById(userId) 
        semasListOfBooks = await Book.find();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: true, message: "Bad request."});   
    }
    
    userPreferences = user.preferences;
    userAge = user.age;
    userLibrary = user.books.allBooks;
    userGoals = user.preferences.goals;
    userInterests = user.preferences.interests;
    suggestionsArr = semasListOfBooks;
    
    //STEP 1 : Filter the books that are already in the user's library :
    suggestionsArr = suggestionsArr.filter(book => !userLibrary.includes(book));

    //STEP 2: if the user has specified his interest(s), only keep the books that correspond to it:
    const filteredByGenre = []
    
    for(let i = 0; i < suggestionsArr.length ; i++){
        let bookGenre = suggestionsArr[i].genre;
        
        if(userInterests.includes(bookGenre)){
            filteredByGenre.push(suggestionsArr[i])
        }
    }
    // console.log("filteredByGenre", filteredByGenre)
    //If the array of suggestion is not empty, we randomly pick a book, otherwise, we repeat the same process with the second criteria: the goal:
    if(filteredByGenre.length > 1 ){
        // If there are several suggestions, we make a random selection out of filteredByGenre's array:
        personalisedSuggestion = filteredByGenre[Math.floor(Math.random() * filteredByGenre.length)]
        return res.status(200).json({success: true, personalisedSuggestion}) 
        
        //If there is just one suggestion, we return the element :
    } else if(filteredByGenre.length === 1){
        personalisedSuggestion = filteredByGenre[0];
        console.log(personalisedSuggestion)
        return res.status(200).json({success: true, personalisedSuggestion})
    } 
    
    //If there is no suggestion by genre, we repeat the same process with the second criteria: the ageRange: 
    if(filteredByGenre.length === 0){
        let filteredByAgeRange = []
        filteredByAgeRange = suggestionsArr.filter(book => book.ageRange.includes(userAge))
        
        if (filteredByAgeRange.length > 1) {
            personalisedSuggestion = filteredByAgeRange[Math.floor(Math.random() * filteredByAgeRange.length)]
            return res.status(200).json({success: true, personalisedSuggestion}) 
            
        } else if(filteredByAgeRange.length === 1){
            personalisedSuggestion = filteredByAgeRange[0];
            return res.status(200).json({success: true, personalisedSuggestion})
        }
    } 
    //Return a random book from Sema's booklist (whole library):
    personalisedSuggestion = semasListOfBooks[Math.floor(Math.random() * semasListOfBooks.length)]
    return res.status(200).json({success:true, personalisedSuggestion})
})

module.exports = router;