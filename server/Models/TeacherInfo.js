const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Middlename: String,
    DOB: String,
    Street: String,
    Barangay: String,
    City: String,
    Province: String,
    SectionHandled: {type: String, unique: true},
    GradeHandled: String,
    Email: {type: String, unique: true},
    Contact: Number,
    verified: {type: Boolean, default: false}
})

const TeacherModel = mongoose.model("teacherinfo", TeacherSchema)
module.exports = TeacherModel;