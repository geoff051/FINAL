const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../Models/AdminInfo');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists in the database
    const user = await AdminModel.findOne({ Username: username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Log the user object to check if the 'verified' field is present
    console.log('User:', user);

    // Check if the account is verified
    const verified = user.verified;

    // Log the 'verified' value
    console.log('Verified:', verified);

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Log the token
    console.log('Token:', token);

    res.json({ token, verified });
  } catch (error) {
    console.error('Login failed:', error); // Log the actual error
    res.status(500).json({ error: 'Unexpected error' });
  }
});

  

module.exports = router;
