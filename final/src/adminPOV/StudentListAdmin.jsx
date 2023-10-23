import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom"

function StudentListAdmin(){
    const [student, setStudent] = useState([{
        Firstname: "Geoff", 
        Lastname: "Escoto", 
        Grade: 5,
        Section: "Maruya",
        LRN: 123456
    }])

    return(
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounder p-3">
            <Link to="/createStudent" className="btn btn-success btn-sm">Add Student +</Link>
         
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
                   {
                    student.map((student) => {
                        return <tr>
                            <td>{student.Firstname} {student.Lastname}</td>
                            <td>{student.Grade}</td>
                            <td>{student.Section}</td>
                            <td>{student.LRN}</td>
                            <td>
                            <Link to="/updateStudent" className="btn btn-success btn-sm">Update</Link>
                                <button>Delete</button>
                            </td>
                        </tr>
                    })
                   }
                </tbody>
            </table>
        </div>

    </div>
    )
}

export default StudentListAdmin;