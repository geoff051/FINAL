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
    },
});

const sendEmail = expressAsyncHandler(async (Email, adminId) => {
    console.log(Email);
  
    const verificationToken = uuidv4();
    const verificationLink = `http://localhost:5173/verificationAdmin?token=${verificationToken}&id=${adminId}`;
  
    const mailOptions = {
      from: {
        name: "Barangay 9 Elementary School",
        address: process.env.EMAIL,
      },
      to: Email,
      subject: "Verification Email",
      text: `To Verify your account please go to ${verificationLink}. 
      After Verification your default password is 123 please change it upon logging in. 
      You can update your account details in the Update Admin option in the sidebar.`,
    };
  
    try {
      // Use async/await for a cleaner asynchronous code style
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!", info.response);
      return { success: true, message: "Email sent successfully", token: verificationToken };
    } catch (error) {
      console.error("Error sending email:", error);
      // You can throw an error or return an error status
      return { success: false, message: "Error sending email" };
    }
});

module.exports = sendEmail;
