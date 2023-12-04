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

    // Group the reports by date and time
    const groupedReports = {};
    reports.forEach((report) => {
      const reportDateTime = report.Date.toISOString().split('.')[0];
      if (!groupedReports[reportDateTime]) {
        groupedReports[reportDateTime] = { Date: reportDateTime, Section: loggedInTeacherSection, Students: [] };
      }
      groupedReports[reportDateTime].Students.push(...report.Students);
    });

    // Convert the grouped reports to an array
    const finalReports = Object.values(groupedReports);

    console.log(finalReports);
    res.json({ reports: finalReports });
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

    // Group the reports by date and time
    const groupedReports = {};
    reports.forEach((report) => {
      const reportDateTime = report.Date.toISOString().split('.')[0];
      if (!groupedReports[reportDateTime]) {
        groupedReports[reportDateTime] = { Date: reportDateTime, Section: loggedInTeacherSection, Students: [] };
      }
      groupedReports[reportDateTime].Students.push(...report.Students);
    });

    // Convert the grouped reports to an array
    const finalReports = Object.values(groupedReports);

    console.log(finalReports);
    res.json({ reports: finalReports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/api/export-to-excel', async (req, res) => {
  try {
    const { attendanceData } = req.body;

    const workbook = new ExcelJS.Workbook();

    attendanceData.forEach((data, index) => {
      // Extract and format the date without the time
      const formattedDate = new Date(data.Date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      // Replace slashes with dots
      const dateOnly = formattedDate.replace(/\//g, '.');

      // Append a counter to ensure unique worksheet names
      const worksheetName = `${dateOnly}_${index + 1}`;

      const worksheet = workbook.addWorksheet(worksheetName); // Use the formatted date as the sheet name

      // Add Section and Date information in the second column
      worksheet.addRow(['', `Section: ${data.Section}`]);
      worksheet.addRow(['', `Date: ${formattedDate}`]);

      // Add headers and make them bold
      const headerRow = worksheet.addRow(['#', 'Name', 'Status']);
      headerRow.font = { bold: true };

      // Add data
      data.Students.forEach((student, studentIndex) => {
        worksheet.addRow([studentIndex + 1, `${student.Firstname} ${student.Lastname}`, student.Status]);
      });

      // Add an empty row between reports
      worksheet.addRow([]);
    });

    // Set column widths
    workbook.eachSheet((sheet) => {
      sheet.columns.forEach((column) => {
        column.width = 15; // Adjust the width as needed
      });
    });

    const fileName = `AttendanceReport_${attendanceData[0].Date}_${attendanceData[0].Section}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






  module.exports = router;