import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function StudentInfoAdmin (){
    const {id} = useParams()
    const [student, setStudent] = useState([])

    const [Firstname, setFirstname] = useState()
    const [Lastname, setLastname] = useState()
    const [Middlename, setMiddlename] = useState()
    const [DOB, setDOB] = useState()
    const [Street, setStreet] = useState()
    const [Barangay, setBarangay] = useState()
    const [City, setCity] = useState()
    const [Province, setProvince] = useState()
    const [Grade, setGrade] = useState()
    const [Section, setSection] = useState()
    const [LRN, setLRN] = useState()
    const [Mother, setMother] = useState()
    const [Father, setFather] = useState()
    const [PEmail, setPEmail] = useState()
    const [Contact, setContact] = useState()


    useEffect(()=> {
      axios.get('http://localhost:3001/student/'+id)
     
      .then(result => setStudent(result.data))
      .catch(err => console.log(err))

  },[])

    useEffect(()=> {
        axios.get('http://localhost:3001/student/'+id)
        .then(result => {console.log(result)
            setFirstname(result.data.Firstname) 
            setLastname(result.data.Lastname)
            setMiddlename(result.data.Middlename)
            setDOB(new Date(result.data.DOB).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
            setStreet(result.data.Street)
            setBarangay(result.data.Barangay)
            setCity(result.data.City)
            setProvince(result.data.Province)
            setGrade(result.data.Grade)
            setSection(result.data.Section)
            setLRN(result.data.LRN)
            setMother(result.data.Mother)
            setFather(result.data.Father)
            setPEmail(result.data.PEmail)
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
              
              <div>
              <h4 className="mb-3">Grade Information</h4><hr />
              <dl className="row">
                <dt className="col-sm-4">Grade</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-6">{Grade}</dd>

                <dt className="col-sm-4">Section</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-6">{Section}</dd>

                <dt className="col-sm-4">LRN</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-6">{LRN}</dd>
              </dl>
              </div>
              <div>
              <h4 className="mb-3">Parents Information</h4><hr />
              <dl className="row">
               
                <dt className="col-sm-4">Mother</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-6">{Mother}</dd>

                <dt className="col-sm-4">Father</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-6">{Father}</dd>

                <dt className="col-sm-4">Parents Email</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-7">{PEmail}</dd>

                <dt className="col-sm-4">Contact</dt>
                <dt className="col-sm-1 text-right">:</dt>
                <dd className="col-sm-6">{Contact}</dd>
              </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer" style={{ backgroundColor: "#b7edba" }}>
          <Link to={`/updateStudent/${student._id}`} className="btn btn-success" style={{ marginRight: '5px' }}>Update Profile</Link>
          <Link to={'/studentListAdmin'} className="btn btn-info ml-2">Back to List</Link>
        </div>
      </div> <br /><br />
      <hr style={{marginLeft:"250px", marginRight:"13px"}}/><br />
      <div style={{ width: "10px", height: "100%", marginRight: "10px" }}>
        </div>
    </div>
  );
}


export default StudentInfoAdmin;