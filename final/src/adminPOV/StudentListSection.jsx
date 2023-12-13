import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css"

function StudentListSection() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const { sectionId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);
    const navigate = useNavigate();
    const [studentCount, setStudentCount] = useState(0);
  
    useEffect(() => {
      axios.get(`http://localhost:3001/student/section/${encodeURIComponent(sectionId)}`)
        .then((result) => {
          console.log(result);
          setStudents(result.data);
        })
        .catch((err) => console.log(err));

      axios.get(`http://localhost:3001/student/studentCountBySection/${encodeURIComponent(sectionId)}`)
        .then(result => {
          console.log(result);
          setStudentCount(result.data.studentCount);
        })
        .catch(err => console.log(err));
    }, [sectionId]);
  
    const handleDelete = (id) => {
      axios
        .delete(`http://localhost:3001/student/${id}`)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    };
  
    const handleLogout = () => {
      localStorage.removeItem("Admintoken");
      localStorage.removeItem("AdminUserData"); // Remove userData
      window.location.reload()
      // Log to check if the token and userData are null after removal
      console.log("Token should be null:", localStorage.getItem("Admintoken"));
      console.log("Token removed from localStorage");
      console.log("UserData should be null:", localStorage.getItem("AdminUserData"));
      console.log("UserData removed from localStorage");
      
      // Redirect to the login page
      navigate('/', { replace: true });    
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
          className={`pagination-button ${currentPage === startPage + i ? "active" : ""}`}
          onClick={() => paginate(startPage + i)}
        >
          {startPage + i}
        </button>
      ));
    };

    return (
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

      <div
        className="headbg"
        style={{
          marginLeft: "250px",
          marginRight: "13px",
          height: "110px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "10px",
        }}
      >
        <br />
        <Link to="/createStudent">
          <button className="button-27 mb-2" role="button">
            Add Student +
          </button>
        </Link>
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
      <tr className="student-count">Total Students: {studentCount} </tr>
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
            {currentStudents
              .filter((student) => {
                return (
                  search.toLowerCase() === "" ||
                  student.Firstname.toLowerCase().includes(search)
                );
              })
              .sort((a, b) => (a.Firstname > b.Firstname ? 1 : -1))
              .map((student, index) => (
                <tr key={student._id}>
                  <td>{indexOfFirstStudent + index + 1}</td>
                  <td>{student.Firstname} {student.Lastname}</td>
                  <td>{student.Grade}</td>
                  <td>{student.Section}</td>
                  <td>{student.LRN}</td>
                  <td>
                    <Link
                      to={`/updateStudent/${student._id}`}
                      className="btn btn-success btn-sm"
                      style={{ marginRight: "4px" }}
                    >
                      Update
                    </Link>
                    <Link
                      to={`/studentInfoAdmin/${student._id}`}
                      className="btn btn-info btn-sm"
                      style={{ marginRight: "4px" }}
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
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
      {/* Other content and closing tags... */}
    </div>
  );
}

export default StudentListSection;