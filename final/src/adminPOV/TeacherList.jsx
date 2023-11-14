import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom"


function TeacherList(){
    const [teacher, setTeacher] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=> {
        axios.get('http://localhost:3001/teacher')
       
        .then(result => setTeacher(result.data))
        .catch(err => console.log(err))

    },[])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/teacher/'+id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => console.log(err))
        alert("Teacher Deleted Succesfully!")
    }

   

    return(
        <div className="background">
            <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="ftable">
            <Link to="/createTeacher" className="btn btn-success btn-sm">Add Teacher +</Link>
            <input type="text" placeholder="Search Teacher" className="search" style={{float: "right"}}
             onChange={(e) => setSearch(e.target.value)}/>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Handled Section</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                   {teacher.filter((teacher) => {
                    return search.toLowerCase() === '' ? teacher : teacher.Firstname.
                    toLowerCase().includes(search)
                   }).sort( (a,b) => a.Firstname > b.Firstname ? 1 : -1).map((teacher) => {
                        return <tr>
                            <td>{teacher.Firstname} {teacher.Lastname}</td>
                            <td>{teacher.GradeHandled}</td>
                            <td>{teacher.SectionHandled}</td>
                            <td>
                            <Link to={`/updateTeacher/${teacher._id}`} className="btn btn-success btn-sm">Update</Link>
                            <Link to={`/teacherInfoAdmin/${teacher._id}`} className="btn btn-info btn-sm">View</Link>
                                <button className="btn btn-danger btn-sm"
                                onClick={(e) => handleDelete(teacher._id)}>Delete</button>
                            </td>
                        </tr>
                    })
                   }
                </tbody>
            </table>
        </div>

    </div>
        </div>
    
    )
}

export default TeacherList;