const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({

    title : {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        // lowercase: true,
        trim: true
    },
    author : {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        lowercase: true,
        trim: true
    },
    synopsis : {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 900,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        // lowercase: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        lowercase: true,
        default : "Non précisé",
        trim: true
    },
    ageRange: {
        type: Array,
        contentType: String,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    image :{
        // type: {data: Buffer, contentType: String},
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    },
    dateAdded: {stringFormat: String, parsedFormat: Number},
    bookStore: {name: String, link: String}
})

const Books = mongoose.model('Books', bookSchema);
module.exports = Books; 