const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Email: {type: String, unique: true},
    Username: {type: String, unique: true},
    Password: {type: String, default: 123},
    verified: {type: Boolean, default: false}
})

const AdminModel = mongoose.model("admininfo", AdminSchema)
module.exports = AdminModel;