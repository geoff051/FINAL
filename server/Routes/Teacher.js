const express = require('express');
const router = express.Router()
const TeacherModel = require('../Models/TeacherInfo');


//get data from database to the teacher list
router.get("/", (req, res) => {
    TeacherModel.find({})
    .then(teacherinfo => res.json(teacherinfo))
    .catch(err => res.json(err))
  })
  
  //send teacher data to database
router.post("/", (req, res) => {
    TeacherModel.create(req.body)
    .then(teacherinfo => res.json(teacherinfo))
    .catch(err => res.json(err))
  })
  
  //To populate the fields when updating the teacher
router.put("/:id", (req, res) => {
      const id = req.params.id;
      TeacherModel.findByIdAndUpdate({_id: id},
        {Firstname: req.body.Firstname,
          Lastname: req.body.Lastname,
          Middlename: req.body.Middlename,
          DOB: req.body.DOB,
          Street: req.body.Street,
          Barangay: req.body.Barangay,
          City: req.body.City,
          Province: req.body.Province,
          SectionHandled: req.body.SectionHandled,
          GradeHandled: req.body.GradeHandled,
          Email: req.body.Email,
          Contact: req.body.Contact
        })
        .then(teacherinfo => res.json(teacherinfo))
        .catch(err => res.json(err))
  })
  
  //delete teacher
router.delete("/:id", (req, res) => {
      const id = req.params.id;
      TeacherModel.findByIdAndDelete({_id: id})
      .then(res => res.json(res))
      .catch(err => res.json(err))
  })
  
  //get specific data from database using id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    TeacherModel.findById({_id:id})
    .then(teacherinfo => res.json(teacherinfo))
    .catch(err => res.json(err))
  })

  module.exports = router;