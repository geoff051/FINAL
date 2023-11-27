import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from 'axios';

import "./style.css";

function CreateAdminAccount() {
    const [Firstname, setFirstname] = useState("");
    const [Lastname, setLastname] = useState("");
    const [Email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [registrationMessage, setRegistrationMessage] = useState("");

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
                Password,
            });
    
            setRegistrationMessage(result.data.message);
            if (result.data.success) {
                window.location.reload();
            }
        } catch (err) {
            console.error("Error creating admin:", err);
            setRegistrationMessage("Error creating admin. Please try again.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            // Proceed with registration
            handleRegistration();
        }

        setValidated(true);
    };

    return (
        <div>
            <br />
            <h1><center>Register an Admin</center></h1>
            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                    {registrationMessage && <div className={registrationMessage.includes('Error') ? 'text-danger' : 'text-success'}>{registrationMessage}</div>}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <p><b>Name</b></p>
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

                            <Form.Group as={Col} md="7" controlId="validationCustom004">
                                <Form.Label>Password</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        minLength="8"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Password must be at least 8 characters long
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <Button type="submit" className="gradient-custom-4">Submit form</Button>
                    </Form>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default CreateAdminAccount;