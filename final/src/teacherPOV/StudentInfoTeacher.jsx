import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function StudentInfoTeacher() {
  const { id } = useParams();

  const [studentData, setStudentData] = useState({
    Firstname: "",
    Lastname: "",
    Middlename: "",
    DOB: "",
    Street: "",
    Barangay: "",
    City: "",
    Province: "",
    Grade: "",
    Section: "",
    LRN: "",
    Mother: "",
    Father: "",
    PEmail: "",
    Contact: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/student/${id}`)
      .then((result) => setStudentData(result.data))
      .catch((err) => console.log(err));
  }, [id]);

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

  return (
    <div className="container-fluid">
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
          <h2>Student Information</h2>
          <hr />
        </div>
      </div>

      <br /><br />
      <div className="card" style={{ maxWidth: '900px', marginLeft: '400px' }}>
        <div className="card-header" style={{ backgroundColor: "#b7edba" }}>
          <h2 className="mb-0">Student Profile</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4 className="mb-3">Personal Information</h4><hr />
              <dl className="row">
                <dt className="col-sm-4">Firstname</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-5">{studentData.Firstname}</dd>

                <dt className="col-sm-4">Lastname</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-5">{studentData.Lastname}</dd>

                <dt className="col-sm-4">Middlename</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-5">{studentData.Middlename}</dd>

                <dt className="col-sm-4">Date of Birth</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-5">{studentData.DOB}</dd>

                <dt className="col-sm-4">Street</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-5">{studentData.Street}</dd>

                <dt className="col-sm-4">Barangay</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-5">{studentData.Barangay}</dd>

                <dt className="col-sm-4">City</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-5">{studentData.City}</dd>

                <dt className="col-sm-4">Province</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-5">{studentData.Province}</dd>

               
              </dl>
            </div>
            <div className="col-md-6">
              <div>
                <h4 className="mb-3">Grade Information</h4><hr />
                <dl className="row">
                  <dt className="col-sm-4">Grade</dt>
                  <dt className="col-sm-1 text-right">:</dt>
                  <dd className="col-sm-6">{studentData.Grade}</dd>

                  <dt className="col-sm-4">Section</dt>
                  <dt className="col-sm-1 text-right">:</dt>
                  <dd className="col-sm-6">{studentData.Section}</dd>

                  <dt className="col-sm-4">LRN</dt>
                  <dt className="col-sm-1 text-right">:</dt>
                  <dd className="col-sm-6">{studentData.LRN}</dd>

                 
                </dl>
              </div>
              <div>
                <h4 className="mb-3">Parents Information</h4><hr />
                <dl className="row">
                  <dt className="col-sm-4">Mother</dt>
                  <dt className="col-sm-1 text-right">:</dt>
                  <dd className="col-sm-6">{studentData.Mother}</dd>

                  <dt className="col-sm-4">Father</dt>
                  <dt className="col-sm-1 text-right">:</dt>
                  <dd className="col-sm-6">{studentData.Father}</dd>

                  <dt className="col-sm-4">Parents Email</dt>
                  <dt className="col-sm-1 text-right">:</dt>
                  <dd className="col-sm-7">{studentData.PEmail}</dd>

                  <dt className="col-sm-4">Contact</dt>
                  <dt className="col-sm-1 text-right">:</dt>
                  <dd className="col-sm-6">{studentData.Contact}</dd>

                  
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer" style={{ backgroundColor: "#b7edba" }}>
          <br />
        </div>
      </div> <br /><br />
      <hr style={{ marginLeft: "250px", marginRight: "13px" }} /><br />
      <div style={{ width: "10px", height: "100%", marginRight: "10px" }}></div>
    </div>
  );
}

export default StudentInfoTeacher;
