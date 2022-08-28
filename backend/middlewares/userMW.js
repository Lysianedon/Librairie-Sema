//---------------------- LIBRARIES ----------------//
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
//----------------- SECRET ------------------//
const secret = process.env.SECRET;
//------------ MODEL -----------------//
const User = require("../models/UserModel");

//------------ FUNCTIONS -----------------//

async function checkIfUserExists(req,res,next){
    //Check if user already exists:
    const email = req.body.email;

    const existingUser = await User.findOne({email});
    if (existingUser) {
        req.userExists = true;
    } else{
        req.userExists = false;
    }
    next();
}

function joiUserValidation(req,res,next){

  const newUser = req.body;
  const validateNewUser = Joi.object({
    firstname: Joi.string().min(1).max(100).required(),
    password: Joi.string().min(1).max(100).required(),
    age: Joi.string().min(1).max(100).required(),
    email: Joi.string().email().required(),
    isAdmin: Joi.boolean(),
    preferences: Joi.object({
      goals: Joi.array().items(Joi.string().min(1).max(100)).max(4), 
      interests: Joi.array().items(Joi.string().min(1).max(100)).max(3)
    }).required(),
    books: Joi.object({
      alreadyRead: Joi.array().items(Joi.string().min(1).max(100)).max(50), 
      favorites: Joi.array().items(Joi.string().min(1).max(100)).max(50), 
      allBooks: Joi.array().items(Joi.string().min(1).max(100)).max(50)
    }).required(),
  });

  const validateUserSchema = validateNewUser.validate(newUser);

  if (validateUserSchema.error) {
    return res.status(400).json({
      message: validateUserSchema.error.details[0].message,
    });
  }
  next();
}

function joiUserPartialValidation(req,res,next){

  const newUser = req.body;
  const validateNewUser = Joi.object({
    firstname: Joi.string().max(100),
    password: Joi.string().min(1).max(100),
    age: Joi.string().max(100),
    email: Joi.string().email(),
    isAdmin: Joi.boolean(),
    preferences: Joi.object({
      goals: Joi.array().items(Joi.string().min(1).max(100)).max(4), 
      interests: Joi.array().items(Joi.string().min(1).max(100)).max(3)
    }),
    books: Joi.object({
      alreadyRead: Joi.array().items(Joi.string().max(100)).max(50), 
      favorites: Joi.array().items(Joi.string().max(100)).max(50), 
      allBooks: Joi.array().items(Joi.string().max(100)).max(50)
    }),
  });

  const validateUserSchema = validateNewUser.validate(newUser);

  if (validateUserSchema.error) {
    return res.status(400).json({
      message: validateUserSchema.error.details[0].message,
    });
  }
  next();
}

const joiValidateUserPreferences = (req,res,next) => {
  const userPreferences = req.body;
  const validateUserPreferences = Joi.object({
    goals: Joi.array().items(Joi.string().min(1).max(100)).max(4), 
    interests: Joi.array().items(Joi.string().min(1).max(100)).max(3)
  }).required();
  
  const validateUserPreferencesSchema = validateUserPreferences.validate(userPreferences);
  
  if(validateUserPreferencesSchema.error){
    return res.status(400).json({
      message: validateUserPreferencesSchema.error.details[0].message
    })
  }
  next();
}

const joiBookValidation = (req, res, next) => {
  const newBook = req.body;

  const bookSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    author: Joi.string().min(1).max(100).required(),
    synopsis: Joi.string().min(1).max(900).required(),
    genre: Joi.string().min(1).max(50).required(),
    country: Joi.string().min(1).max(50).required(),
    ageRange: Joi.array().items(Joi.string().min(1).max(30)).max(3).required(),
    image: Joi.string().min(1).max(500).required(),
    dateAdded: Joi.object({
      stringFormat: Joi.string().min(1).max(90).required(),
      parsedFormat: Joi.number.min(1).max(30).required(),
    }).required()
  })

  const validateBookSchema = bookSchema.validate(newBook)

  if(validateBookSchema.error){
    return res.status(400).json({
      message: validateBookSchema.error.details[0].message
    })
  }
  next();
}

// AUTHENTICATION/AUTHORIZATION - FOR ALL AUTHENTICATED USERS :
// * 1 - First, we check if incoming request has our cookie (called "jwt") ; if no cookie, access to controller prohibited
const auth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).json({
      error: true,
      message: "Forbidden access. Login first.",
    });
  }

  // * 2 - If cookie, check token to obtain data and declare new properties in the request object to make it easier for us to access token's data
  try {
    const data = jwt.verify(token, secret);
    // We create a req.userId and assign the value of the id in the token (optional : same for req.userRole)
    req.userId = data.id;
    req.userRole = data.role;
    req.verifiedUserInfo = data;
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden access. Login first.",
    });
  }
  // * 3 - Access given to controller
  next();
};

//CHECK IF USER IS ADMIN : 
const checkIfAdmin = async (req,res,next) => {
  let user, userId = req.userId;

  try {
    user = await User.findById(userId);
  } catch (error) {
   return res.status(400).json({ message: "Bad Request.", error: true });
  }
  
  //Checking to see if user is admin or not:
  if(!user.isAdmin){
    return res.status(401).json({
      message: "Access forbidden. You must be an admin to access this page.", 
      error: true
    });
  }
  next();
}

const addBookToAllBooksCategory = async (req,res,next) => {
  const userId = req.userId;
  let userLibrary, addedBook = req.body.bookToAddID, updatedLibrary;
  
  //Finding the user:
  try {
      userLibrary = await User.findById(userId)
  } catch (error) {
      return res.status(404).json({ error: true, message: "A problem occured." });     
  }
  //Selecting user's library:
  userLibrary = userLibrary.books.allBooks;

  //If the added book is not already in the 'allBooks' category, it gets added to it: 
  if (userLibrary.filter(bookId => bookId.toString() === addedBook.toString()).length === 0) {
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
            return res.status(404).json({ error: true, message: "A problem occured." });   
        }
  }
  next();
}

const deleteBookFromAllBookCategory = async (req,res,next) => {
  const userId = req.userId;
  let deletedBook = req.body.bookToDeleteID, updatedLibrary;

  //Finding the user:
  try {
    userLibrary = await User.findById(userId)
  } catch (error) {
    return res.status(404).json({ error: true, message: "A problem occured." });     
  }
  //Selecting user's library:
  userLibrary = userLibrary.books.allBooks;
  updatedLibrary = userLibrary.filter(bookId => bookId.toString() !== deletedBook.toString())

  try {
    userLibrary = await User.findByIdAndUpdate(userId, 
        {
            $set : {
                'books.allBooks': updatedLibrary //Updating user's library in user Schema
            }
        }, {new: true}).populate({path: 'books.allBooks', model: 'Books'});
    } catch (error) {
        return res.status(404).json({ error: true, message: "A problem occured." });   
    }

  next();
}


const checkIfBookAlreadyInList = async (req,res,next) => {
  const userId = req.userId;
  let alreadyReadCategory, allBooksCategory, addedBook = req.body.bookToAddID, deletedBook = req.body.bookToDeleteID;

  //Finding the user:
  try {
      userLibrary = await User.findById(userId)
  } catch (error) {
      return res.status(404).json({ error: true, message: "A problem occured." });     
  }
  //Checking if bookId is already in either "ro read" category or "already read" category :
  alreadyReadCategory = userLibrary.books.alreadyRead;
  allBooksCategory = userLibrary.books.allBooks;
  favoritesCategory = userLibrary.books.favorites;

  if(addedBook){
    //If the added book is not already in the 'Already Read' category, a boolean 'true' is created: 
    if (alreadyReadCategory.filter(bookId => bookId.toString() === addedBook.toString()).length > 0) {
      req.isBookAlreadyInAlreadyReadCategory = true
    }
    //If the added book is not already in the 'All Books' category, a boolean 'true' is created: 
    if (allBooksCategory.filter(bookId => bookId.toString() === addedBook.toString()).length > 0) {
      req.isBookAlreadyInAllBooksCategory = true
    }
    //If the added book is not already in the 'favorites' category, a boolean 'true' is created: 
    if (favoritesCategory.filter(bookId => bookId.toString() === addedBook.toString()).length > 0) {
      req.isBookAlreadyInFavoritesCategory = true
    }
  }

  if(deletedBook){
    if (favoritesCategory.filter(bookId => bookId.toString() === deletedBook.toString()).length > 0) {
      req.isBookAlreadyInFavoritesCategory = true
    }
    //If the added book is already in the 'Already Read' category, a boolean 'true' is created: 
    if (alreadyReadCategory.filter(bookId => bookId.toString() === deletedBook.toString()).length > 0) {
      req.isBookAlreadyInAlreadyReadCategory = true
    }
    //If the added book is already in the 'All Books' category, a boolean 'true' is created: 
    if (allBooksCategory.filter(bookId => bookId.toString() === deletedBook.toString()).length > 0) {
      req.isBookAlreadyInAllBooksCategory = true
    }
  }
  next();
}


module.exports = {checkIfUserExists, joiUserValidation, joiUserPartialValidation, joiValidateUserPreferences, auth, addBookToAllBooksCategory,deleteBookFromAllBookCategory, checkIfBookAlreadyInList, checkIfAdmin, joiBookValidation};