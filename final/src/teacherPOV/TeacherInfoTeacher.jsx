import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounder p-3">
                <h2>Profile</h2>
                <ul>
                    {teacherData.additionalData && (
                        <>
                            <li><strong>Firstname:</strong> {teacherData.additionalData.Firstname}</li>
                            <li><strong>Lastname:</strong> {teacherData.additionalData.Lastname}</li>
                            <li><strong>Middlename:</strong> {teacherData.additionalData.Middlename}</li>
                            <li><strong>DOB:</strong> {teacherData.additionalData.DOB}</li>
                            <li><strong>Street:</strong> {teacherData.additionalData.Street}</li>
                            <li><strong>Barangay:</strong> {teacherData.additionalData.Barangay} </li>
                            <li><strong>City:</strong> {teacherData.additionalData.City} </li>
                            <li><strong>Province:</strong> {teacherData.additionalData.Province} </li>
                            <li><strong>Grade Handled:</strong> {teacherData.additionalData.GradeHandled} </li>
                            <li><strong>Section Handled:</strong> {teacherData.additionalData.SectionHandled} </li>
                            <li><strong>Email:</strong> {teacherData.additionalData.Email} </li>
                            <li><strong>Contact:</strong> {teacherData.additionalData.Contact} </li>
                            <Link to={`/teacherPersonalUpdate/${teacherData.id}`} className="btn btn-success btn-sm">Update</Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default TeacherInfoTeacher;