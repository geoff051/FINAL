const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Middlename: String,
    Status: String,
    Date: String
})

const AttendanceModel = mongoose.model("attendanceinfo", AttendanceSchema)
module.exports = AttendanceModel;