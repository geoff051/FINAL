import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function StudentInfoTeacher (){
    const {id} = useParams()

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
        .then(result => {console.log(result)
            setFirstname(result.data.Firstname) 
            setLastname(result.data.Lastname)
            setMiddlename(result.data.Middlename)
            setDOB(result.data.DOB)
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

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounder p-3">
                <h2>Student Information</h2>
                    <ul>
                        <li><strong>Firstname:</strong> {Firstname}</li>
                        <li><strong>Lastname:</strong> {Lastname}</li>
                        <li><strong>Middlename:</strong> {Middlename}</li>
                        <li><strong>DOB:</strong> {DOB}</li>
                        <li><strong>Street:</strong> {Street}</li>
                        <li><strong>Barangay:</strong> {Barangay} </li>
                        <li><strong>City:</strong> {City} </li>
                        <li><strong>Province:</strong> {Province} </li>
                        <li><strong>Grade:</strong> {Grade} </li>
                        <li><strong>Section:</strong> {Section} </li>
                        <li><strong>LRN:</strong> {LRN} </li>
                        <li><strong>Mother:</strong> {Mother} </li>
                        <li><strong>Father:</strong> {Father} </li>
                        <li><strong>PEmail:</strong> {PEmail} </li>
                        <li><strong>Contact:</strong> {Contact} </li>
                    </ul>
            </div>
           
                
        
      
    </div>
    )
}

export default StudentInfoTeacher;