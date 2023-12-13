const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../Models/AdminInfo');
const { v4: uuidv4 } = require('uuid');

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
    console.log('Verified:', verified);

    const userData = {
      userId: user._id,
      Username: user.Username,
      FirstName: user.Firstname,
      LastName: user.Lastname,
      Email: user.Email
      // Add other fields as needed
    };

    // Generate a JWT token
    const token = jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const AdminToken = uuidv4();
    // Log the token
    console.log('Token:', token);
    console.log('AdminToken', AdminToken)
    res.json({ token, verified, AdminToken, userData: {
      userId: user._id,
      Username: user.Username,
      FirstName: user.Firstname,
      LastName: user.Lastname,
      Email: user.Email
    } });
    
  } catch (error) {
    console.error('Login failed:', error); // Log the actual error
    res.status(500).json({ error: 'Unexpected error' });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

router.get('/userData', verifyToken, (req, res) => {
  // Access user data from the decoded token
  const userData = req.user;

  // You can now use userData in your route logic
  res.json({ userData });
});


  

module.exports = router;
