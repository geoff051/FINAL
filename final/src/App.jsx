import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AdminisAuthenticated from './Controller/AdminAuthUtils'
import isAuthenticated from './Controller/AuthUtils'
import LayoutTPOV from './components/LayoutTPOV'
import Layout from './components/Layout'
import Login from './Login'
import Error from './Error'




import * as adminPOV from './adminPOV/index'
import * as teacherPOV from './teacherPOV/indexTPOV'
import * as resetPASS from './PASS RESET/index'


function App() {
  const TeacherAuth = isAuthenticated();
  const AdminAuth = AdminisAuthenticated();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error />}></Route>
          <Route path="/" element={!AdminAuth && !TeacherAuth ? (<Login />) : ( AdminAuth ? <Navigate to="/adminHomepage" /> : <Navigate to="/teacherHomepage" />)}></Route>
          
          <Route path="/adminHomepage" element={AdminAuth ? <Layout><adminPOV.AdminHomepage /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/createStudent" element={AdminAuth ? <Layout><adminPOV.CreateStudent /></Layout> : <Navigate to="/"/>}></Route>
          <Route path="/updateStudent/:id" element={AdminAuth ? <Layout><adminPOV.UpdateStudent /></Layout> : <Navigate to="/"/>}></Route>
          <Route path="/studentListAdmin" element={AdminAuth ? <Layout><adminPOV.StudentListAdmin /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/studentInfoAdmin/:id" element={AdminAuth ? <Layout><adminPOV.StudentInfoAdmin /></Layout> : <Navigate to="/"/>}></Route>
          <Route path="/addClassList" element={AdminAuth ? <Layout><adminPOV.AddClassList /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/studentListSection/:sectionId" element={AdminAuth ? <Layout><adminPOV.StudentListSection /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/classListAdmin" element={AdminAuth ? <Layout><adminPOV.ClassListAdmin /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/teacherList" element={AdminAuth ? <Layout><adminPOV.TeacherList /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/createTeacher" element={AdminAuth ? <Layout><adminPOV.CreateTeacher /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/updateTeacher/:id" element={AdminAuth ? <Layout><adminPOV.UpdateTeacher /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/teacherInfoAdmin/:id" element={AdminAuth ? <Layout><adminPOV.TeacherInfoAdmin /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/createAdminAccount" element={AdminAuth ? <Layout><adminPOV.CreateAdminAccount /></Layout> : <Navigate to="/" />}></Route>
          <Route path="/updateAdminAccount" element={AdminAuth ? <Layout><adminPOV.UpdateAdminAccount /></Layout> : <Navigate to="/" />}></Route>

          <Route path="/verificationAdmin" element={<adminPOV.VerificationAdmin/>}></Route>
          

          <Route path="/verification" element={<teacherPOV.Verification />}></Route>
          
          <Route path="/teacherHomepage" element={TeacherAuth ? <LayoutTPOV><teacherPOV.TeacherHomepage /></LayoutTPOV> : <Navigate to="/" />}></Route>
          <Route path="/classListTeacher" element={TeacherAuth ? <LayoutTPOV><teacherPOV.ClassListTeacher /></LayoutTPOV> : <Navigate to="/" />}></Route>
          <Route path="/studentInfoTeacher/:id" element={TeacherAuth ? <LayoutTPOV><teacherPOV.StudentInfoTeacher /></LayoutTPOV> : <Navigate to="/" />}></Route>
          <Route path="/attendanceTracker" element={TeacherAuth ? <LayoutTPOV><teacherPOV.AttendanceTracker /></LayoutTPOV> : <Navigate to="/" />}></Route>
          <Route path="/teacherInfoTeacher" element={TeacherAuth ? <LayoutTPOV><teacherPOV.TeacherInfoTeacher /></LayoutTPOV> : <Navigate to="/" />}></Route>
          <Route path="/teacherPersonalUpdate/:id" element={TeacherAuth ? <LayoutTPOV><teacherPOV.TeacherPersonalUpdate /></LayoutTPOV> : <Navigate to="/" />}></Route>
          <Route path="/generateAttendanceReport" element={TeacherAuth ? <LayoutTPOV><teacherPOV.GenerateAttendanceReport/></LayoutTPOV> : <Navigate to="/" />}></Route>


          <Route path="/inputNewPassword" element={<resetPASS.InputNewPassword />}></Route>
          <Route path="/inputEmail" element={<resetPASS.InputEmail/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
