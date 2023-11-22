const express = require('express');
const router = express.Router()
const AttendanceReportModel = require('../Models/AttendanceReportInfo');
const sendEmailT = require('../config/sendEmailT'); 

router.post('/addReport', async (req, res) => {
  try {
    const { Section, Students } = req.body;

    // Create a new AttendanceReportModel instance
    const attendanceReport = new AttendanceReportModel({
      Section,
      Students
    });

    // Save the attendance report to the database
    const savedReport = await attendanceReport.save();

    // Send emails to parents
    Students.forEach(async (student) => {
      const { Firstname, Lastname, PEmail, Status } = student;
      await sendEmailT(PEmail, `${Firstname} ${Lastname}`, Status);
      console.log(`Email sent to ${PEmail} for ${Firstname} ${Lastname}`);
    });

    res.status(201).json(savedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  module.exports = router;