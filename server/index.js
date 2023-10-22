const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Models/StudentInfo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Final')

app.get('/', (req, res) => {
  UserModel.find()
  .then(user => res.json(user))
  .catch(err => res.json(err))  
})

app.listen(3001, () => {
    console.log("Server is Running");
})