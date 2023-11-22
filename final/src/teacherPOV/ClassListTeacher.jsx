import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ClassListTeacher(){
    const [students, setStudents] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [teacherData, setTeacherData] = useState ([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:3001/teacher/api/userData', { withCredentials: true })
          .then(response => {
            console.log('User data response:', response.data);
      
            setTeacherData({
              id: response.data.id,
              additionalData: {
                ...response.data.additionalData,
              }
            });
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }, []);
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch student data
            const response = await axios.get("http://localhost:3001/teacher/api/getStudent", { withCredentials: true });
            const responseData = response.data;
    
            // Set the state with the fetched data
            setTeacher(responseData.teacher);
            setStudents(responseData.students);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
    

    


    return(
        <div className="background">
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <div className="ftable">
                <input type="text" placeholder="Search Student" className="search" style={{float: "right"}}
             onChange={(e) => setSearch(e.target.value)}/>

                <h4>Section: {teacherData.additionalData?.SectionHandled || "N/A"} </h4>
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
                            {students.filter((student) => {
                    return search.toLowerCase() === '' ? student : student.Firstname.
                    toLowerCase().includes(search)
                   }).sort( (a,b) => a.Firstname > b.Firstname ? 1 : -1).map((student) => (
                                <tr key={student._id}>
                                    <td>{student.Firstname} {student.Lastname}</td>
                                    <td>{student.Grade}</td>
                                    <td>{student.Section}</td>
                                    <td>{student.LRN}</td>
                                    <td>
                                    <Link to={`/studentInfoTeacher/${student._id}`} className="btn btn-info btn-sm">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ClassListTeacher;