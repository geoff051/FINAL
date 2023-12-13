import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styleTPOV.css"

function ClassListTeacher(){
    const [students, setStudents] = useState([]);
    const [studentsPerPage] = useState(10);
    const [teacher, setTeacher] = useState({});
    const [teacherData, setTeacherData] = useState ([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentCount, setStudentCount] = useState(0);
    
    
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


      useEffect(() => {
        const fetchStudentCount = async () => {
          try {
            // Check if teacherData and teacherData.additionalData are defined
            if (!teacherData || !teacherData.additionalData) {
              console.error('teacherData or teacherData.additionalData is undefined.');
              return;
            }
      
            // Fetch student count for the section
            const response = await axios.get('http://localhost:3001/teacher/getStudentCount', {
              withCredentials: true,
              params: {
                SectionHandled: teacherData.additionalData.SectionHandled,
              },
            });
      
            const { studentCount } = response.data;
      
            // Set the student count state
            setStudentCount(studentCount);
          } catch (error) {
            console.error('Error fetching student count:', error);
          }
        };
      
        fetchStudentCount();
      }, [teacherData]);

      
    

      const handleLogout = () => {
        localStorage.removeItem('teacherToken');
        axios.get('http://localhost:3001/auth/logout', { withCredentials: true })
            .then(() => {
                
                console.log('Token removed from localStorage');
              
                navigate('/', { replace: true });
                console.log('Redirected successfully');
                
            })
            .catch(error => {
                 
                 console.error('Logout failed:', error);
            });
            window.location.reload();
    };

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(students.length / studentsPerPage);

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPages);
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const paginationRange = 10; // Set the number of pagination buttons to display

  const renderPaginationButtons = () => {
    const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
    const endPage = Math.min(totalPages, startPage + paginationRange - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => (
      <button
        key={startPage + i}
        className={`pagination-button ${currentPage === startPage + i ? 'active' : ''}`}
        onClick={() => paginate(startPage + i)}
      >
        {startPage + i}
      </button>
    ));
  };


    return(
        <div className="container-fluid">

      <div style={{ width: "120px", height: "100%", marginRight: "150px" }}>
        {/* Your existing sidebar content */}
      </div>

      <div style={{ marginLeft: "250px", marginRight: "13px" }}>
        <br />
        <div>
          <button
            className="button-5"
            style={{ float: "right" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div>
          <h2>Student List</h2>
          <hr />
        </div>
      </div>


      <div className="headbg" style={{
        marginLeft: "250px",
        marginRight: "13px",
        height: "110px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "10px",
      }}>
        <br />
        <tr className="student-count" style={{backgroundColor:'whitesmoke'}}>Total Students: {studentCount} </tr>
        <div style={{ float: "right" }}>
          <input
            type="text"
            placeholder="Search Student"
            className="search form-control"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <br />
      </div>

            <br />
                <div className="ftable" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginLeft: "250px" }}>
                
                <h4>Section: {teacherData.additionalData?.SectionHandled || "N/A"} </h4>
                
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Grade</th>
                                <th>Section</th>
                                <th>LRN</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudents.filter((student) => {
                    return search.toLowerCase() === '' ? student : student.Firstname.
                    toLowerCase().includes(search)
                   }).sort( (a,b) => a.Firstname > b.Firstname ? 1 : -1).map((student, index) => (
                                <tr key={student._id}>
                                    <td>{indexOfFirstStudent + index + 1}</td>
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

                    <div className="pagination-container">
        <button className="pagination-button" onClick={firstPage} disabled={currentPage === 1}>
          First
        </button>
        <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>
        <span>&#60;</span>
        </button>
        {renderPaginationButtons()}
        <button className="pagination-button" onClick={nextPage} disabled={currentPage === totalPages}>
        <span>&#62;</span>
        </button>
        <button className="pagination-button" onClick={lastPage} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
                </div>
                <hr style={{marginLeft:"250px", marginRight:"13px"}}/><br />
      <div style={{ width: "10px", height: "100%", marginRight: "10px" }}>
        {/* Your existing sidebar content */}
      </div>
            </div>
        
    )
}

export default ClassListTeacher;