import axios from "axios";
import React, { useEffect, useState } from "react";



function TeacherHomepage() {
    const [teacherData, setTeacherData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3001/teacher/api/userData', { withCredentials: true })
            .then(response => {
                setTeacherData(prevData => ({
                    ...prevData,
                    id: response.data.id,
                    Firstname: response.data.additionalData.Firstname,
                    Lastname: response.data.additionalData.Lastname,
                }));
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [teacherData]);

    return (
        <div>
            <center>Welcome to Homepage, {teacherData.Firstname}</center>
        </div>
    )
}

export default TeacherHomepage;