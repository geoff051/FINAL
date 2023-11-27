    const nodemailer = require('nodemailer');
    const expressAsyncHandler = require('express-async-handler');
    const { v4: uuidv4 } = require('uuid');
    const AdminModel = require('../Models/AdminInfo');

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

    const sendEmail = expressAsyncHandler(async (Email, adminId) => {
        const resetPasswordLink = `http://localhost:5173/inputNewPassword?id=${adminId}`;
      
        const mailOptions = {
          from: {
            name: "Barangay 9 Elementary School",
            address: process.env.EMAIL,
          },
          to: Email,
          subject: "Reset Password",
          text: `To reset your password, please go to ${resetPasswordLink}`,
        };
      
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log("Email sent successfully!", info.response);
      
          return { success: true, message: "Email sent successfully" };
        } catch (error) {
          console.error("Error sending email:", error);
          return { success: false, message: "Error sending email" };
        }
      });
      
      module.exports = sendEmail;
      