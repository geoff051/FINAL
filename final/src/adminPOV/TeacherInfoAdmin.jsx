import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function TeacherInfoAdmin (){
    const {id} = useParams()
    const [teacher, setTeacher] = useState([])

    const [Firstname, setFirstname] = useState()
    const [Lastname, setLastname] = useState()
    const [Middlename, setMiddlename] = useState()
    const [DOB, setDOB] = useState()
    const [Street, setStreet] = useState()
    const [Barangay, setBarangay] = useState()
    const [City, setCity] = useState()
    const [Province, setProvince] = useState()
    const [GradeHandled, setGradeHandled] = useState()
    const [SectionHandled, setSectionHandled] = useState()
    const [Email, setEmail] = useState()
    const [Contact, setContact] = useState()
    
    useEffect(()=> {
        axios.get('http://localhost:3001/teacher/'+id)
       
        .then(result => setTeacher(result.data))
        .catch(err => console.log(err))

    },[])

    useEffect(()=> {
        axios.get('http://localhost:3001/teacher/'+id)
        .then(result => {console.log(result)
            setFirstname(result.data.Firstname) 
            setLastname(result.data.Lastname)
            setMiddlename(result.data.Middlename)
            setDOB(result.data.DOB)
            setStreet(result.data.Street)
            setBarangay(result.data.Barangay)
            setCity(result.data.City)
            setProvince(result.data.Province)
            setGradeHandled(result.data.GradeHandled)
            setSectionHandled(result.data.SectionHandled)
            setEmail(result.data.Email)
            setContact(result.data.Contact)
        })
        .catch(err => console.log(err))
    },[])

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
            <h2>Teacher Information</h2>
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
          <dd className="col-sm-5">{Firstname}</dd>

          <dt className="col-sm-4">Lastname</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{Lastname}</dd>

          <dt className="col-sm-4">Middlename</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{Middlename}</dd>

          <dt className="col-sm-4">Date of Birth</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{DOB}</dd>

          <dt className="col-sm-4">Street</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{Street}</dd>

          <dt className="col-sm-4">Barangay</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{Barangay}</dd>

          <dt className="col-sm-4">City</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{City}</dd>

          <dt className="col-sm-4">Province</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{Province}</dd>
        </dl>
      </div>
      <div className="col-md-6">
        <h4 className="mb-3">Grade Information</h4><hr />
        <dl className="row">
          <dt className="col-sm-4">Grade Handled</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{GradeHandled}</dd>

          <dt className="col-sm-4">Section Handled</dt>
          <dt className="col-sm-1 text-right">:</dt>
          <dd className="col-sm-5">{SectionHandled}</dd>

          {/* Add other grade information here */}
        </dl>
        <div>
          <h4 className="mb-3">Contact Information</h4><hr />
          <dl className="row">
            <dt className="col-sm-4">Email</dt>
            <dt className="col-sm-1 text-right">:</dt>
            <dd className="col-sm-7">{Email}</dd>

            <dt className="col-sm-4">Contact</dt>
            <dt className="col-sm-1 text-right">:</dt>
            <dd className="col-sm-6">{Contact}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
  <div className="card-footer" style={{ backgroundColor: "#b7edba" }}>
    <Link to={`/updateTeacher/${teacher._id}`} className="btn btn-success" style={{ marginRight: '5px' }}>Update Profile</Link>
    <Link to={'/teacherList'} className="btn btn-info ml-2">Back to List</Link>
  </div>
</div>
<br /><br />
<hr style={{ marginLeft: "250px", marginRight: "13px" }} /><br />
<div style={{ width: "10px", height: "100%", marginRight: "10px" }}></div>
           
                
        
      
    </div>
    )
}

export default TeacherInfoAdmin;