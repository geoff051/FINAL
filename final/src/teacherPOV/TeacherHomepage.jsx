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
            <div style={{ width: "250px", height: "100%", marginRight: "150px" }}>
                {/* Your existing sidebar content */}
            </div><br /><br />
            <div className="d-flex flex-column align-items-center" style={{ marginLeft: "250px" }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.5140741677274!2d125.13092117484832!3d8.150847091879552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffaa25c1400001%3A0x3aefa617496cb9ab!2sBarangay%209%20Elementary%20School!5e0!3m2!1sfil!2sph!4v1701183455802!5m2!1sfil!2sph"
                    width="800"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>


            </div>
        </div>
    )
}

export default TeacherHomepage;