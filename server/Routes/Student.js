const express = require('express');
const router = express.Router()
const StudentModel = require('../Models/StudentInfo');
const SectionModel = require('../Models/SectionInfo')

//get data from database to the student list
router.get("/", (req, res) => {
    StudentModel.find({})
    .then(studentinfo => res.json(studentinfo))
    .catch(err => res.json(err))
  })
  
  //send data to database
router.post("/", (req, res) => {
    StudentModel.create(req.body)
    .then(studentinfo => res.json(studentinfo))
    .catch(err => res.json(err))
  })
  
  //To populate the fields when updating the student
router.put("/:id", (req, res) => {
      const id = req.params.id;
      StudentModel.findByIdAndUpdate({_id: id},
        {Firstname: req.body.Firstname,
          Lastname: req.body.Lastname,
          Middlename: req.body.Middlename,
          DOB: req.body.DOB,
          Street: req.body.Street,
          Barangay: req.body.Barangay,
          City: req.body.City,
          Province: req.body.Province,
          Grade: req.body.Grade,
          Section: req.body.Section,
          LRN: req.body.LRN,
          Mother: req.body.Mother,
          Father: req.body.Father,
          PEmail: req.body.PEmail,
          Contact: req.body.Contact
        })
        .then(studentinfo => res.json(studentinfo))
        .catch(err => res.json(err))
  })

 
  //delete student
router.delete("/:id", (req, res) => {
      const id = req.params.id;
      StudentModel.findByIdAndDelete({_id: id})
      .then(res => res.json(res))
      .catch(err => res.json(err))
  })
  
  //get specific data from database using id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    StudentModel.findById({_id:id})
    .then(studentinfo => res.json(studentinfo))
    .catch(err => res.json(err))
  })


router.get('/section/:sectionId', async (req, res) => {
  const sectionId = req.params.sectionId;

  try {
    const students = await StudentModel.find({ Section: sectionId });

    if (!students.length) {
      return res.status(404).json({ error: 'No students found for the section' });
    }

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });
  module.exports = router;