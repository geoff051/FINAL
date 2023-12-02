const express = require('express');
const router = express.Router()
const AttendanceReportModel = require('../Models/AttendanceReportInfo');
const TeacherModel = require('../Models/TeacherInfo')
const sendEmailT = require('../config/sendEmailT'); 
const ExcelJS = require('exceljs');

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

router.get('/getReports/single', async (req, res) => {
  try {
    console.log('Single Date Request Received');
    const userId = req.session.user.id;
    const loggedInTeacher = await TeacherModel.findById(userId);
    const loggedInTeacherSection = loggedInTeacher.SectionHandled;

    const { date } = req.query;

    // Adjust the date filtering
    const fromDateObj = new Date(`${date}T00:00:00.000Z`);
    const untilDateObj = new Date(`${date}T23:59:59.999Z`);

    const reports = await AttendanceReportModel.find({
      Section: loggedInTeacherSection,
      Date: { $gte: fromDateObj, $lt: untilDateObj }
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Report');

    // Add headers
    worksheet.addRow(['Date', 'Section', 'Student Name', 'Status']);

    // Add data
    reports.forEach((report) => {
      report.Students.forEach((student) => {
        worksheet.addRow([report.Date, report.Section, `${student.Firstname} ${student.Lastname}`, student.Status]);
      });
    });

    // Save to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Send Excel file as response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=attendance_report_single_date.xlsx');
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getReports/multiple', async (req, res) => {
  try {
    console.log('Multiple Date Request Received');
    const userId = req.session.user.id;
    const loggedInTeacher = await TeacherModel.findById(userId);
    const loggedInTeacherSection = loggedInTeacher.SectionHandled;

    const { fromDate, untilDate } = req.query;

    const fromDateObj = new Date(`${fromDate}T00:00:00.000Z`);
    const untilDateObj = new Date(`${untilDate}T23:59:59.999Z`);

    const reports = await AttendanceReportModel.find({
      Section: loggedInTeacherSection,
      Date: { $gte: fromDateObj, $lt: untilDateObj }
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Report');

    // Add headers
    worksheet.addRow(['Date', 'Section', 'Student Name', 'Status']);

    // Add data
    reports.forEach((report) => {
      report.Students.forEach((student) => {
        worksheet.addRow([report.Date, report.Section, `${student.Firstname} ${student.Lastname}`, student.Status]);
      });
    });

    // Save to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Send Excel file as response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=attendance_report_single_date.xlsx');
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/downloadReport/single', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const loggedInTeacher = await TeacherModel.findById(userId);
    const loggedInTeacherSection = loggedInTeacher.SectionHandled;

    const { date } = req.query;

    const fromDateObj = new Date(`${date}T00:00:00.000Z`);
    const untilDateObj = new Date(`${date}T23:59:59.999Z`);

    const reports = await AttendanceReportModel.find({
      Section: loggedInTeacherSection,
      Date: { $gte: fromDateObj, $lt: untilDateObj },
    });

    const { buffer, fileName } = await generateExcelFile(reports, 'attendance_report_single_date.xlsx');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/downloadReport/multiple', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const loggedInTeacher = await TeacherModel.findById(userId);
    const loggedInTeacherSection = loggedInTeacher.SectionHandled;

    const { fromDate, untilDate } = req.query;

    const fromDateObj = new Date(`${fromDate}T00:00:00.000Z`);
    const untilDateObj = new Date(`${untilDate}T23:59:59.999Z`);

    const reports = await AttendanceReportModel.find({
      Section: loggedInTeacherSection,
      Date: { $gte: fromDateObj, $lt: untilDateObj },
    });

    const { buffer, fileName } = await generateExcelFile(reports, 'attendance_report_date_range.xlsx');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  module.exports = router;