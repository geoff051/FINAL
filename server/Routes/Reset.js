const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AdminModel = require('../Models/AdminInfo');
const sendEmailOTP = require('../config/sendEmailOTP'); // Import your sendEmail module

router.post('/check-email', async (req, res) => {
  try {
    const { Email } = req.body;

    // Query the AdminModel to check if the email exists
    const admin = await AdminModel.findOne({ Email });

    if (admin) {
      // Email exists, generate a reset password link and send it via email
      const resetPasswordLink = `http://localhost:5173/inputNewPassword?id=${admin._id}`;

      // Use the sendEmail module to send the reset password link
      const result = await sendEmailOTP(Email, admin._id, resetPasswordLink);

      if (result.success) {
        return res.json({ exists: true, message: 'Email sent successfully' });
      } else {
        return res.json({ exists: false, message: 'Error sending reset password email' });
      }
    } else {
      // Email does not exist
      return res.json({ exists: false, message: 'Email does not exist. Please contact the admin.' });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ exists: false, message: 'Internal server error' });
  }
});


router.post('/update-password', async (req, res) => {
    try {
      const { adminId, password } = req.body;
  
      // Query the AdminModel to find the admin by ID
      const admin = await AdminModel.findById(adminId);
  
      if (!admin) {
        return res.json({ success: false, message: 'Admin not found' });
      }
  
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update the password for the admin
      admin.Password = hashedPassword;
      await admin.save();
  
      return res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

module.exports = router;
