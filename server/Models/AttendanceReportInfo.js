const mongoose = require('mongoose')

const AttendanceReportSchema = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Date: String,
    Status: String
})

const AttendanceReportModel = mongoose.model("attendanceReportinfo", AttendanceReportSchema)
module.exports = AttendanceReportModel;