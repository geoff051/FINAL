const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const AdminModel = require('../Models/AdminInfo')
const sendEmail = require('../config/sendEmailA');

router.get('/checkExistence', async (req, res) => {
  try {
    const { field, value } = req.query;

    if (!field || !value) {
      return res.status(400).json({ error: 'Field and value are required parameters.' });
    }

    const query = {};
    query[field] = value;

    const exists = await AdminModel.exists(query);

    res.json({ exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/createAdmin', async (req, res) => {
  try {
    const { Firstname, Lastname, Email, Username, Password } = req.body;

    // Check if the email or username already exists
    const isEmailExists = await AdminModel.exists({ Email });
    const isUsernameExists = await AdminModel.exists({ Username });

    if (isEmailExists) {
      return res.status(400).json({ error: 'Email already exists. Please choose a different email.' });
    }

    if (isUsernameExists) {
      return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Save the admin information with the hashed password
    const adminInfo = await AdminModel.create({
      Firstname,
      Lastname,
      Email,
      Username,
      Password: hashedPassword,
    });

    // Only send verification email if admin creation is successful
    if (adminInfo) {
      // Send verification email
      const emailVerificationResult = await sendEmail(adminInfo.Email,adminInfo._id);

      if (emailVerificationResult.success) {
        return res.json({ success: true, message: 'Admin created successfully. Verification email sent.' });
      } else {
        return res.status(500).json({ success: false, message: 'Admin created, but error sending verification email.' });
      }
    } else {
      return res.status(500).json({ success: false, message: 'Error creating admin.' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.post('/verificationAdmin', async (req, res) => {
  const { token, id } = req.body;

  try {
    console.log('Received verification request:', { token, id });

    // Validate the token and ID (you might want to check the expiration time, etc.)
    // If the validation is successful, update the admin's status to "verified" or perform any other required actions
    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      { _id: id, verificationToken: token },
      { $set: { verified: true, verificationToken: null } }, // Set verified to true and clear the verificationToken
      { new: true }
    );

    console.log('Updated admin:', updatedAdmin);

    if (updatedAdmin) {
      res.status(200).json({ success: true, message: 'Verification successful' });
    } else {
      res.status(404).json({ error: 'Admin not found or verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  
module.exports = router;