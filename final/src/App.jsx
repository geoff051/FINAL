import { useState } from 'react'
import './App.css'
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './Login'
import CreateStudent from './adminPOV/CreateStudent'
import StudentListAdmin from './adminPOV/StudentListAdmin'
import UpdateStudent from './adminPOV/UpdateStudent'
import StudentInfoAdmin from './adminPOV/StudentInfoAdmin'
import ClassListAdmin from './adminPOV/ClassListAdmin'
import AddClassList from './adminPOV/AddClassList'
import StudentListSection from './adminPOV/StudentListSection'
import TeacherList from './adminPOV/TeacherList'
import CreateTeacher from './adminPOV/CreateTeacher'
import UpdateTeacher from './adminPOV/UpdateTeacher'
import TeacherInfoAdmin from './adminPOV/TeacherInfoAdmin'
import AdminHomepage from './adminPOV/AdminHomepage'
import TeacherHomepage from './teacherPOV/TeacherHomepage'




function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}></Route> 
            <Route path="/adminHomepage" element={<Layout><AdminHomepage /></Layout>}></Route>
            <Route path="/createStudent" element={<CreateStudent />}></Route>
            <Route path="/updateStudent/:id" element={<UpdateStudent />}></Route> 
            <Route path="/studentListAdmin" element={<Layout><StudentListAdmin /></Layout>}></Route>   
            <Route path="/studentInfoAdmin/:id" element={<Layout><StudentInfoAdmin /></Layout>}></Route>
            <Route path="/addClassList" element={<AddClassList />}></Route>
            <Route path="/studentListSection/:sectionId" element={<Layout><StudentListSection /></Layout>}></Route>
            <Route path="/classListAdmin" element={<Layout><ClassListAdmin /></Layout>}></Route>
            <Route path="/teacherList" element={<Layout><TeacherList /></Layout>}></Route>
            <Route path="/createTeacher" element={<CreateTeacher />}></Route>
            <Route path="/updateTeacher/:id" element={<UpdateTeacher />}></Route>
            <Route path="/teacherInfoAdmin/:id" element={<Layout><TeacherInfoAdmin /></Layout>}></Route>
            <Route path="/teacherHomepage" element={<TeacherHomepage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
   
    
  )
}

export default App
