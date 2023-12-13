import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"; // Import the necessary components from your MDBReact library

function TeacherInfoTeacher() {
    const [teacherData, setTeacherData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3001/teacher/api/userData', { withCredentials: true })
            .then(response => {
                setTeacherData({
                    id: response.data.id,
                    additionalData: {
                        ...response.data.additionalData,
                        // Add more properties as needed
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []); // Empty dependency array to ensure useEffect runs only once

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

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
            <h2>Personal Profile</h2>
            <hr />
            </div>
        </div><br /><br />

        <div className="card" style={{ maxWidth: '900px', marginLeft: '400px' }}>
  <div className="card-header" style={{ backgroundColor: "#b7edba" }}>
    <h2 className="mb-0">Teacher Information</h2>
  </div>
  <div className="card-body">
    <div className="row">
      <div className="col-md-6">
        <h4 className="mb-3">Personal Information</h4><hr />
        <dl className="row">
          <dt className="col-sm-4">Firstname</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.Firstname}</dd>

          <dt className="col-sm-4">Lastname</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.Lastname}</dd>

          <dt className="col-sm-4">Middlename</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.Middlename}</dd>

          <dt className="col-sm-4">Date of Birth</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{formatDate(teacherData.additionalData?.DOB)}</dd>

          <dt className="col-sm-4">Street</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.Street}</dd>

          <dt className="col-sm-4">Barangay</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.Barangay}</dd>

          <dt className="col-sm-4">City</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.City}</dd>

          <dt className="col-sm-4">Province</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.Province}</dd>
        </dl>
      </div>
      <div className="col-md-6">
        <h4 className="mb-3">Grade Information</h4><hr />
        <dl className="row">
          <dt className="col-sm-4">Grade Handled</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.GradeHandled}</dd>

          <dt className="col-sm-4">Section Handled</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{teacherData.additionalData?.SectionHandled}</dd>

          {/* Add other grade information here */}
        </dl>
        <div>
          <h4 className="mb-3">Contact Information</h4><hr />
          <dl className="row">
            <dt className="col-sm-4">Email</dt>
            <dt className="col-sm-1 text-right">:</dt>
            <dd className="col-sm-7">{teacherData.additionalData?.Email}</dd>

            <dt className="col-sm-4">Contact</dt>
            <dt className="col-sm-1 text-right">:</dt>
            <dd className="col-sm-6">{teacherData.additionalData?.Contact}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
  <div className="card-footer" style={{ backgroundColor: "#b7edba" }}>
  <Link to={`/teacherPersonalUpdate/${teacherData.id}`} className="btn btn-success btn-sm">Update</Link>
  </div>
</div>
<br /><br />
<hr style={{ marginLeft: "250px", marginRight: "13px" }} /><br />
<div style={{ width: "10px", height: "100%", marginRight: "10px" }}></div>
           
    </div>
    )
}

export default TeacherInfoTeacher;
