const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//passport & session & path
const path = require('path')
const passport = require('passport')
const session = require('express-session')

//new morgan
const morgan = require('morgan')

//(new) path to connect to .env
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env'})

//passport config
require('./config/passport')(passport)

const studentRoute = require('./Routes/Student')
const teacherRoute = require('./Routes/Teacher')
const attendanceRoute = require('./Routes/Attendance')
const sectionRoute = require('./Routes/Section')
const attendanceReportRoute = require('./Routes/AttendanceReport')
//new
const loginRoute = require('./Routes/Login')
const authRoute = require('./Routes/auth')



const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

//morgan
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())



mongoose.connect("mongodb+srv://botoyski123:13245724Ge@final.caukqer.mongodb.net/Final?retryWrites=true&w=majority")



//new
app.use("/login", loginRoute);
app.use("/auth", authRoute)


app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);
app.use("/attendance", attendanceRoute);
app.use("/section", sectionRoute);
app.use("/attendanceReport", attendanceReportRoute)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});