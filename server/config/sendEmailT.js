const nodemailer = require('nodemailer');
const expressAsyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const sendEmailT = expressAsyncHandler(async (PEmail, studentName, studentStatus) => {
  console.log(PEmail);

  const mailOptions = {
    from: {
      name: "Barangay 9 Elementary School",
      address: process.env.EMAIL,
    },
    to: PEmail,
    subject: "Attendance Report",
    text: `Dear Parent your Son/Daughter ${studentName} is ${studentStatus} for today!\n\nBest regards,\nBarangay 9 Elementary School`,
  };

  try {
    // Use async/await for a cleaner asynchronous code style
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    // You can throw an error or return an error status
    return { success: false, message: "Error sending email" };
  }
});

module.exports = sendEmailT;
