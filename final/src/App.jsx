import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LayoutTPOV from './components/LayoutTPOV'
import Layout from './components/Layout'
import Login from './Login'


import * as adminPOV from './adminPOV/index'
import * as teacherPOV from './teacherPOV/indexTPOV'


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/adminHomepage" element={<Layout><adminPOV.AdminHomepage /></Layout>}></Route>
          <Route path="/createStudent" element={<adminPOV.CreateStudent />}></Route>
          <Route path="/updateStudent/:id" element={<adminPOV.UpdateStudent />}></Route>
          <Route path="/studentListAdmin" element={<Layout><adminPOV.StudentListAdmin /></Layout>}></Route>
          <Route path="/studentInfoAdmin/:id" element={<Layout><adminPOV.StudentInfoAdmin /></Layout>}></Route>
          <Route path="/addClassList" element={<adminPOV.AddClassList />}></Route>
          <Route path="/studentListSection/:sectionId" element={<Layout><adminPOV.StudentListSection /></Layout>}></Route>
          <Route path="/classListAdmin" element={<Layout><adminPOV.ClassListAdmin /></Layout>}></Route>
          <Route path="/teacherList" element={<Layout><adminPOV.TeacherList /></Layout>}></Route>
          <Route path="/createTeacher" element={<adminPOV.CreateTeacher />}></Route>
          <Route path="/updateTeacher/:id" element={<adminPOV.UpdateTeacher />}></Route>
          <Route path="/teacherInfoAdmin/:id" element={<Layout><adminPOV.TeacherInfoAdmin /></Layout>}></Route>

          <Route path="/verification" element={<teacherPOV.Verification />}></Route>
          <Route path="/teacherHomepage" element={<LayoutTPOV><teacherPOV.TeacherHomepage /></LayoutTPOV>}></Route>
          <Route path="/classListTeacher" element={<LayoutTPOV><teacherPOV.ClassListTeacher /></LayoutTPOV>}></Route>
          <Route path="/studentInfoTeacher/:id" element={<LayoutTPOV><teacherPOV.StudentInfoTeacher /></LayoutTPOV>}></Route>
          <Route path="/attendanceTracker" element={<LayoutTPOV><teacherPOV.AttendanceTracker /></LayoutTPOV>}></Route>
          <Route path="/teacherInfoTeacher" element={<LayoutTPOV><teacherPOV.TeacherInfoTeacher /></LayoutTPOV>}></Route>
          <Route path="/teacherPersonalUpdate/:id" element={<teacherPOV.TeacherPersonalUpdate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
