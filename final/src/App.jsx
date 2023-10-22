import { useState } from 'react'
import './App.css'
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login'
import CreateStudent from './adminPOV/CreateStudent'
import StudentListAdmin from './adminPOV/StudentListAdmin'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}></Route> 
            <Route path="/createStudent" element={<CreateStudent />}></Route>
            <Route path="/studentListAdmin" element={<StudentListAdmin />}></Route>    
        </Routes>
      </BrowserRouter>
    </div>
   
    
  )
}

export default App
