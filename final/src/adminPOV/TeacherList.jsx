import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./style.css"


function TeacherList(){
    const [teacher, setTeacher] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [teacherPerPage] = useState(10);
    const navigate = useNavigate();
    const [teacherCount, setTeacherCount] = useState(0);

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

    useEffect(() => {
        // Fetch the student count when the component mounts
        const fetchStudentCount = async () => {
          try {
            const response = await axios.get('http://localhost:3001/teacher/teacherCount');
            const { teacherCount } = response.data;
            setTeacherCount(teacherCount);
          } catch (error) {
            console.error('Error fetching student count:', error);
          }
        };
    
        fetchStudentCount();
      }, []);


  const indexOfLastTeacher = currentPage * teacherPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teacherPerPage;
  const currentTeachers = teacher.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(teacher.length / teacherPerPage);

  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
          <h2>Teacher List</h2>
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
        <Link to="/createTeacher">
          <button className="button-27 mb-2" role="button">
            Create Teacher Account +
          </button>
        </Link>
        <div style={{ float: "right" }}>
          <input
            type="text"
            placeholder="Search Teacher"
            className="search form-control"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <br />
      </div>
    <br />
        <div className="ftable" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginLeft: "250px" }}>
        <tr className="student-count">Total Teachers: {teacherCount} </tr>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Handled Section</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {currentTeachers.filter((teacher) => {
                    return search.toLowerCase() === '' ? teacher : teacher.Firstname.
                    toLowerCase().includes(search)
                   }).sort( (a,b) => a.Firstname > b.Firstname ? 1 : -1).map((teacher, index) => {
                        return <tr>
                            <td>{indexOfFirstTeacher + index + 1}</td>
                            <td>{teacher.Firstname} {teacher.Lastname}</td>
                            <td>{teacher.GradeHandled}</td>
                            <td>{teacher.SectionHandled}</td>
                            <td>
                            <Link to={`/updateTeacher/${teacher._id}`} className="btn btn-success btn-sm" style={{marginRight: "4px"}}>Update</Link>
                            <Link to={`/teacherInfoAdmin/${teacher._id}`} className="btn btn-info btn-sm" style={{marginRight: "4px"}}>View</Link>
                                <button className="btn btn-danger btn-sm"
                                onClick={(e) => handleDelete(teacher._id)}>Delete</button>
                            </td>
                        </tr>
                    })
                   }
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

export default TeacherList;