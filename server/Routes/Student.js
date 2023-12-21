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

//counts the number of student
router.get('/studentCount', async (req, res) => {
    try {
      const studentCount = await StudentModel.countDocuments();
      res.json({ studentCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //counts the number of student based on section
  router.get('/studentCountBySection/:sectionId', async (req, res) => {
    try {
      const sectionId = req.params.sectionId;
      const studentCount = await StudentModel.countDocuments({ Section: sectionId });
      res.json({ studentCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //send data to database
router.post("/", (req, res) => {
    StudentModel.create(req.body)
    .then(studentinfo => res.json(studentinfo))
    .catch(err => res.json(err))
  })

  router.get('/all-sections', async (req, res) => {
    try {
      console.log('Fetching all sections...');
      // Fetch all sections from the SectionModel
      const allSections = await SectionModel.find({}).exec();
      console.log('Sections:', allSections);
      res.json(allSections);  
    } catch (error) {
      console.error('Error fetching sections:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
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
  

  router.get('/check-lrn/:lrn', async (req, res) => {
    try {
      const lrn = req.params.lrn;
  
      // Check if LRN already exists in the database
      const student = await StudentModel.findOne({ LRN: lrn });
  
      if (student) {
        // LRN is already taken
        return res.json({ isTaken: true });
      } else {
        // LRN is available
        return res.json({ isTaken: false });
      }
    } catch (error) {
      console.error('Error checking LRN:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  module.exports = router;