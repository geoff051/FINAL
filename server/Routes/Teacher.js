const express = require('express');
const router = express.Router()
const sendEmail = require('../config/sendEmail')
const TeacherModel = require('../Models/TeacherInfo');
const StudentModel = require('../Models/StudentInfo')
const passport = require('passport');



// API endpoint to retrieve user data from the session
router.get('/api/userData', (req, res) => {
  // Check if user data is stored in the session
  const userData = req.session.user;
  if (userData) {
      res.json(userData);
  } else {
      res.status(401).json({ message: 'User not authenticated' });
  }
});

router.get('/api/getStudent', async (req, res) => {
  const userData = req.session.user;

  if (userData) {
    // Fetch additional teacher data
    const teacher = await TeacherModel.findById(userData.id).exec();

    // Fetch students with the same section
    const students = await StudentModel.find({ Section: teacher.SectionHandled }).exec();

    // Combine teacher and student data
    const responseData = {
      teacher: {
        id: teacher.id,
        additionalData: teacher.additionalData,
      },
      students: students,
    };

    res.json(responseData);
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});


//get data from database to the teacher list
router.get("/", (req, res) => {
    TeacherModel.find({})
    .then(teacherinfo => res.json(teacherinfo))
    .catch(err => res.json(err))
  })
  
  //send teacher data to database
  router.post("/", async (req, res) => {
    try {
      // Create a teacher record in the database
      const teacherInfo = await TeacherModel.create(req.body);
  
      // Send verification email with the teacher's information
      const emailResult = await sendEmail(teacherInfo.Email, teacherInfo._id);
  
      if (emailResult.success) {
        // Email sent successfully
        res.json(teacherInfo);
      } else {
        // Email sending failed
        console.error("Error sending email:", emailResult.message);
        res.status(500).json({ error: "Error sending email" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  //Verification update
  router.post('/verify', async (req, res) => {
    const { token, id } = req.body;
  
    try {
      // Validate the token and ID (you might want to check the expiration time, etc.)
      // If the validation is successful, update the teacher's status to "verified" or perform any other required actions
      const updatedTeacher = await TeacherModel.findByIdAndUpdate(
        { _id: id, verificationToken: token },
        { $set: { verified: true, verificationToken: null } }, // Set verified to true and clear the verificationToken
        { new: true }
      );
  
      if (updatedTeacher) {
        res.status(200).json({ message: 'Verification successful' });
      } else {
        res.status(404).json({ error: 'Teacher not found or verification failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
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
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const teacherinfo = await TeacherModel.findById(id).lean().exec();
  
      if (!teacherinfo) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      res.json(teacherinfo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 
  module.exports = router;