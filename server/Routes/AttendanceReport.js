const express = require('express');
const router = express.Router()
const AttendanceReportModel = require('../Models/AttendanceReportInfo');


//get data from database 
router.get("/", (req, res) => {
    AttendanceReportModel.find({})
    .then(attendanceReportinfo => res.json(attendanceReportinfo))
    .catch(err => res.json(err))
  })
  
  //send attendance record data to database
router.post("/", (req, res) => {
    AttendanceReportModel.create(req.body)
    .then(attendanceReportinfo => res.json(attendanceReportinfo))
    .catch(err => res.json(err))
  })


  module.exports = router;