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
    SectionHandled: String,
    GradeHandled: String,
    Email: String,
    Contact: Number,
    googleId: {
        type: String,
        required: true
    }
})

const TeacherModel = mongoose.model("teacherinfo", TeacherSchema)
module.exports = TeacherModel;