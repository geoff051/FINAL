const express = require('express');
const router = express.Router()
const AttendanceModel = require('../Models/AttendanceInfo');


//get data from database 
router.get("/", (req, res) => {
    AttendanceModel.find({})
    .then(attendanceinfo => res.json(attendanceinfo))
    .catch(err => res.json(err))
  })
  
  //send attendance record data to database
router.post("/", (req, res) => {
    AttendanceModel.create(req.body)
    .then(attendanceinfo => res.json(attendanceinfo))
    .catch(err => res.json(err))
  })
  
  //To populate fields
router.put("/:id", (req, res) => {
      const id = req.params.id;
      AttendanceModel.findByIdAndUpdate({_id: id},
        {Firstname: req.body.Firstname,
          Lastname: req.body.Lastname,
          Middlename: req.body.Middlename,
          Date: req.body.Date
        })
        .then(attendanceinfo => res.json(attendanceinfo))
        .catch(err => res.json(err))
  })
  
  //delete attendance
router.delete("/:id", (req, res) => {
      const id = req.params.id;
      AttendanceModel.findByIdAndDelete({_id: id})
      .then(res => res.json(res))
      .catch(err => res.json(err))
  })
  
  //get specific data from database using id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    AttendanceModel.findById({_id:id})
    .then(attendanceinfo => res.json(attendanceinfo))
    .catch(err => res.json(err))
  })

  module.exports = router;