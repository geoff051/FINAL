const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  Firstname: String,
  Lastname: String,
  Status: String
});

const AttendanceReportSchema = new mongoose.Schema({
  Section: String,
  Date: { type: Date, default: Date.now },
  Students: [StudentSchema]
});

const AttendanceReportModel = mongoose.model("attendanceReportinfo", AttendanceReportSchema);

module.exports = AttendanceReportModel;