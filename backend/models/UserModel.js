const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
      },
    age: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
    email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        lowercase: true,
        unique: true,
    },
    isAdmin: { type: Boolean, default: false },

    preferences: {
        type: Object,
        required: true,
        maxlength: 2,
        
        goals : {
            type: Array,
            // minlength: 1,
            maxlength: 4,
            default: []
        },

        interests : {
            type: Array,
            // minlength: 1,
            maxlength: 4,
            default: []
        },
    },

    books : {
        type: Object,
        required: true,
        maxlength: 3,
        
        allBooks : [{ type: mongoose.Types.ObjectId, ref: "Books", maxlength: 100, default: [] }],
        favorites : [{ type: mongoose.Types.ObjectId, ref: "Books", maxlength: 100, default: [] }],
        alreadyRead : [{ type: mongoose.Types.ObjectId, ref: "Books", maxlength: 100, default: [] }]
    }
})

const Users = mongoose.model("Users", userSchema);

module.exports = Users;