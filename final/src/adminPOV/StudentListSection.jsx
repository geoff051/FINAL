import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentListSection() {
    const [students, setStudents] = useState([]);
    const { sectionId } = useParams(); // Updated to use the correct destructuring syntax

    useEffect(() => {
        axios.get(`http://localhost:3001/student/section/${encodeURIComponent(sectionId)}`)
          .then(result => {
            console.log(result);
            setStudents(result.data);
          })
          .catch(err => console.log(err));
      }, [sectionId]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/student/${id}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="background">
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <div className="ftable">
                    <Link to="/createStudent" className="btn btn-success btn-sm">Add Student +</Link>
                    {/* ... Other code ... */}
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
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.Firstname} {student.Lastname}</td>
                                    <td>{student.Grade}</td>
                                    <td>{student.Section}</td>
                                    <td>{student.LRN}</td>
                                    <td>
                                        <Link to={`/updateStudent/${student._id}`} className="btn btn-success btn-sm" style={{marginRight: "4px"}}>Update</Link>
                                        <Link to={`/studentInfoAdmin/${student._id}`} className="btn btn-info btn-sm" style={{marginRight: "4px"}}>View</Link>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(student._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentListSection;