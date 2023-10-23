const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Models/StudentInfo')

const sInfo = express()
sInfo.use(cors())
sInfo.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/Final")

sInfo.post("/createStudent", (req, res) => {
  UserModel.create(req.body)
  .then(studentInfo => res.json(studentInfo))
  .catch(err => res.json(err))
})

sInfo.listen(3001, () => {
    console.log("Server is Running");
})