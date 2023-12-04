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

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <MDBCard className="w-50 bg-white rounded p-3">
                <MDBCardBody>
                    <h2>Teacher Info</h2>
                    {teacherData.additionalData && (
                        <div className="profile-container">
                            <div className="profile-item">
                                <strong>Name:</strong> {`${teacherData.additionalData.Firstname} ${teacherData.additionalData.Middlename} ${teacherData.additionalData.Lastname}`}
                            </div>
                            <div className="profile-item">
                                <strong>Date Of Birth:</strong> {teacherData.additionalData.DOB}
                            </div>
                            <div className="profile-item">
                                <strong>Email:</strong> {teacherData.additionalData.Email}
                            </div>
                            <div className="profile-item">
                                <strong>Contact:</strong> {teacherData.additionalData.Contact}
                            </div>
                            <div className="profile-item">
                                <strong>Address:</strong> {`${teacherData.additionalData.Street}, ${teacherData.additionalData.Barangay}, ${teacherData.additionalData.City}, ${teacherData.additionalData.Province}`}
                            </div>
                            <div className="profile-item">
                                <strong>Grade Handled:</strong> {teacherData.additionalData.GradeHandled}
                            </div>
                            <div className="profile-item">
                                <strong>Section Handled:</strong> {teacherData.additionalData.SectionHandled}
                            </div>
                            <Link to={`/teacherPersonalUpdate/${teacherData.id}`} className="btn btn-success btn-sm">Update</Link>
                        </div>
                    )}
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default TeacherInfoTeacher;
