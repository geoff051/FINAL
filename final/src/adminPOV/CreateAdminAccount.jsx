import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from 'axios';
import "./style.css";
import { useNavigate } from "react-router-dom";



function CreateAdminAccount() {
    const [Firstname, setFirstname] = useState("");
    const [Lastname, setLastname] = useState("");
    const [Email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [validated, setValidated] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState("");
    const navigate = useNavigate();

    const checkExistence = async (field, value) => {
        try {
            const response = await axios.get(`http://localhost:3001/admin/checkExistence?field=${field}&value=${value}`);
            return response.data.exists;
        } catch (error) {
            console.error("Error checking existence:", error);
            return false;
        }
    };

    const handleRegistration = async () => {
        const isEmailExists = await checkExistence("Email", Email);
        const isUsernameExists = await checkExistence("Username", Username);
    
        if (isEmailExists) {
            setRegistrationMessage("Email already exists. Please choose a different email.");
            return;
        }
    
        if (isUsernameExists) {
            setRegistrationMessage("Username already exists. Please choose a different username.");
            return;
        }
    
        try {
            const result = await axios.post("http://localhost:3001/admin/createAdmin", {
                Firstname,
                Lastname,
                Email,
                Username,
            });
    
            setRegistrationMessage(result.data.message);
            if (result.data.success) {
                alert("Admin Created Successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error("Error creating admin:", err);
            setRegistrationMessage("Error creating admin. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
    
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                // Proceed with registration
                await handleRegistration();
                // If registration is successful
                
            } catch (error) {
                // Handle registration failure if needed
                console.error("Error during registration:", error);
            }
        }
        
        setValidated(true);
    };

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
<div style={{ width: "120px", height: "100%", marginRight: "142px" }}>
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
            <h2>Create Admin Account</h2>
            <hr />
            </div>
        </div>
            
            <div style={{marginLeft:"100px"}}>
                <MDBCard className='bg-white my-5 mx-auto' 
            style={{ borderRadius: '1rem', 
                     maxWidth: '500px',
                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                    <div style={{color: 'red'}}>
                       <div style={{ color: registrationMessage.includes('Error') ? 'red' : 'red' }}>{registrationMessage}</div> 
                    </div>
                    
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <h4>Admin Account</h4> <hr />
                        <Row className="mb-3">
                            <Form.Group as={Col} md="5" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    onChange={(e) => setFirstname(e.target.value)}

                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="5" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    onChange={(e) => setLastname(e.target.value)}

                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="7" controlId="validationCustom002">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter A Valid Email
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} md="7" controlId="validationCustom003">
                                <Form.Label>Username</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <Button type="submit" className="register">Submit form</Button>
                    </Form>
                </MDBCardBody>
            </MDBCard>
            </div>
            <hr style={{marginLeft:"250px", marginRight:"13px"}}/><br />
        </div>
    );
}

export default CreateAdminAccount;