const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    // Middlename: String,
    // DOB: String,
    // Street: String,
    // Barangay: String,
    // City: String,
    // Province: String,
    Grade: Number,
    Section: String,
    LRN: Number,
    // Mother: String,
    // Father: String,
    // Email: String,
    // Contact: Number 
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel;