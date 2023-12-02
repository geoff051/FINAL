import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom"


function StudentListAdmin(){
    const [student, setStudent] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=> {
        axios.get('http://localhost:3001/student')
        .then(result => setStudent(result.data))
        .catch(err => console.log(err))

    },[])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/student/'+id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => console.log(err))
    }

   

    return(
        <div className="background">
            <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="ftable">
            <Link to="/createStudent" className="btn btn-success btn-sm">Add Student +</Link>
            <input type="text" placeholder="Search Student" className="search" style={{float: "right"}}
             onChange={(e) => setSearch(e.target.value)}/>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Section</th>
                        <th>LRN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                   {student.filter((student) => {
                    return search.toLowerCase() === '' ? student : student.Firstname.
                    toLowerCase().includes(search)
                   }).sort( (a,b) => a.Firstname > b.Firstname ? 1 : -1).map((student) => {
                        return <tr>
                            <td>{student.Firstname} {student.Lastname}</td>
                            <td>{student.Grade}</td>
                            <td>{student.Section}</td>
                            <td>{student.LRN}</td>
                            <td>
                            <Link to={`/updateStudent/${student._id}`} className="btn btn-success btn-sm" style={{marginRight: "4px"}}>Update</Link>
                            <Link to={`/studentInfoAdmin/${student._id}`} className="btn btn-info btn-sm" style={{marginRight: "4px"}}>View</Link>
                                <button className="btn btn-danger btn-sm"
                                onClick={(e) => handleDelete(student._id)}>Delete</button>
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

export default StudentListAdmin;