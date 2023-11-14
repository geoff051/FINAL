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

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounder p-3">
                <h2>Teacher Information</h2>
                    <ul>
                        <li><strong>Firstname:</strong> {Firstname}</li>
                        <li><strong>Lastname:</strong> {Lastname}</li>
                        <li><strong>Middlename:</strong> {Middlename}</li>
                        <li><strong>DOB:</strong> {DOB}</li>
                        <li><strong>Street:</strong> {Street}</li>
                        <li><strong>Barangay:</strong> {Barangay} </li>
                        <li><strong>City:</strong> {City} </li>
                        <li><strong>Province:</strong> {Province} </li>
                        <li><strong>Grade Handled:</strong> {GradeHandled} </li>
                        <li><strong>Section Handled:</strong> {SectionHandled} </li>
                        <li><strong>Email:</strong> {Email} </li>
                        <li><strong>Contact:</strong> {Contact} </li>
                        <Link to={`/updateTeacher/${teacher._id}`} className="btn btn-success btn-sm">Update  </Link>
                        <Link to={'/teacherList'} className="btn btn-info btn-sm">Back</Link>
                    </ul>
            </div>
           
                
        
      
    </div>
    )
}

export default TeacherInfoAdmin;