import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css"


function AdminHomepage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null)
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const storedUserData = localStorage.getItem('AdminUserData');
        const parsedUserData = JSON.parse(storedUserData);
    
        // Set user data in state
        setUserData(parsedUserData);
    
        // Extract FirstName and set it in a separate state variable
        if (parsedUserData) {
            const { FirstName } = parsedUserData;
            setFirstName(FirstName);
        }
    }, []);

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

            <div style={{ width: "250px", height: "100%", marginRight: "150px" }}>
                {/* Your existing sidebar content */}
            </div>
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
                {userData ? (
                <div>
                    <h2>Welcome, {firstName}!</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
                    <hr />
                </div>
            </div>




            <div style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "3px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                marginLeft: '250px',
                marginRight: '13px'
            }}>
                <br />

                <center>
                    <div>
                        <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.5140741677274!2d125.13092117484832!3d8.150847091879552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffaa25c1400001%3A0x3aefa617496cb9ab!2sBarangay%209%20Elementary%20School!5e0!3m2!1sfil!2sph!4v1701183455802!5m2!1sfil!2sph"
                        width="900"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    </div>
                    
                </center>


                <br />
                <h3 style={{ marginLeft: '200px' }}>School Information</h3>
                <hr style={{ marginLeft: '200px', marginRight: '200px' }} />

                <div style={{ marginLeft: '200px', marginRight: '250px' }}>
                    <dl style={{ float: "left" }}>
                        <dt>School ID</dt>
                        <dd>199510</dd>

                        <dt>School Name</dt>
                        <dd>Barangay 9 Elementary School</dd>

                        <dt>School Name w/ Add</dt>
                        <dd>Barangay 9 Elementary School, Malaybalay City, Bukidnon</dd>

                        <dt>Address</dt>
                        <dd>Vicente Neri St., Barangay 9, Malaybalay City</dd>

                        <dt>Municipality</dt>
                        <dd>MALAYBALAY CITY</dd>

                        <dt>Region</dt>
                        <dd>Region X</dd>

                        <dt>Province</dt>
                        <dd>Bukidnon</dd>

                        <dt>Division</dt>
                        <dd>Malaybalay City</dd>


                    </dl>

                    <dl style={{ float: "right" }}>
                        <dt>Legislative District</dt>
                        <dd>2nd District</dd>

                        <dt>Curricular Class</dt>
                        <dd>Kinder & Elementary</dd>

                        <dt>Date of Operation</dt>
                        <dd>Tuesday, June 01, 2004</dd>

                        <dt>District</dt>
                        <dd>Malaybalay City District IV</dd>

                        <dt>Classification</dt>
                        <dd>DepED Managed</dd>

                        <dt>School Type</dt>
                        <dd>School with no Annexes</dd>

                        <dt>Class Organization</dt>
                        <dd>Monograde</dd>
                    </dl>
                </div>

                

                <div style={{marginTop: '500px', marginLeft:'200px', marginRight:'200px'}}>
                     
                  <h3>School History</h3>  
                  <hr style={{ marginTop:'25px' }} />
                  <br />
                  <p>Barangay 9 Elementary School, established in the year 2004, was instituted as an extension of the Malaybalay City Central School (MCCS).
                     Its inception was driven by the imperative need to address the escalating enrollment challenges faced by MCCS, particularly concerning elementary students. 
                     The establishment of Barangay 9 Elementary School was envisioned as an efficacious remedy to alleviate the burgeoning student population enrolling at MCCS.</p>
                
                <p style={{marginTop:'10px'}}>During its early stage, Mr. Gamboa served as the sole educator at the school, and the institution had the humble provision of a solitary classroom.
                     As aptly characterized by our client as a "One teacher, one classroom school."</p>
                
                <p style={{marginTop:'10px'}}>In the present day, the school has undergone considerable growth, boasting a complement of 18 teaching personnel and 5 non-teaching staff members. 
                    This augmentation reflects the enhanced scale and scope of its operations.</p>
                
                <p style={{marginTop:'10px'}}>However, one significant and persistent challenge facing the school is the status of the land upon which it stands. Regrettably, the property is not owned by 
                    the Department of Education (DepEd); rather, it is under the ownership of the Department of Environment and Natural Resources (DENR). This situation has curtailed
                     the school's ability to undertake comprehensive infrastructure development projects. The property is subject to a contract-based arrangement, necessitating periodic renewal every 25 years.</p>
                
                <p style={{marginTop:'10px'}}>This ongoing issue underscores the need for a sustainable resolution that will enable Barangay 9 Elementary School to address its infrastructure needs and continue providing quality education to its students effectively.</p>
                
                
                
                </div>
                <br />
            </div>



            <hr style={{ marginLeft: "250px", marginRight: "13px" }} /><br />
            <div style={{ width: "10px", height: "100%", marginRight: "10px" }}>
                {/* Your existing sidebar content */}
            </div>

        </div>
    )
}

export default AdminHomepage;
