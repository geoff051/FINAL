import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function UpdateAdminAccount() {
    const [userData, setUserData] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Username: '',
        Password: '',
    });
    const [usernameError, setUsernameError] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the userData from localStorage
        const storedUserData = localStorage.getItem('AdminUserData');

        if (storedUserData) {
            // Parse the JSON string to an object
            const parsedUserData = JSON.parse(storedUserData);

            // Set user data in state
            setUserData(parsedUserData);

            // Directly set the fields here
            setUpdatedUserData({
                FirstName: parsedUserData.FirstName,
                LastName: parsedUserData.LastName,
                Email: parsedUserData.Email,
                Username: parsedUserData.Username,
                Password: '',
            });
        }
    }, []);

    const handleUpdate = async () => {
        try {
            // Check if all fields are filled
            if (
                !updatedUserData.FirstName ||
                !updatedUserData.LastName ||
                !updatedUserData.Email ||
                !updatedUserData.Username ||
                !updatedUserData.Password
            ) {
                setValidationError('All fields are required');
                return;
            }

            // Check password criteria
            const passwordError = getPasswordValidationError(updatedUserData.Password);
            if (passwordError) {
                setValidationError(passwordError);
                return;
            }

            // Clear validation error
            setValidationError('');

            // Use PUT request to update user data
            const response = await axios.put(`http://localhost:3001/admin/updateUser/${userData.userId}`, {
                updatedUserData,
            });

            alert('Admin Updated Successfully');
            console.log('User updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error.response?.data?.message || 'Unexpected error');

            // Set the username error message if it's due to a duplicate username
            if (error.response?.status === 400 && error.response?.data?.message === 'Admin username is already taken') {
                setUsernameError('Admin username is already taken');
            } else {
                setUsernameError('');
            }
        }
    };

    const getPasswordValidationError = (password) => {
        // Password must have a minimum of 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character
        const minLength = 8;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long`;
        }

        if (!uppercaseRegex.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }

        if (!lowercaseRegex.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }

        if (!digitRegex.test(password)) {
            return 'Password must contain at least one number';
        }

        if (!specialCharacterRegex.test(password)) {
            return 'Password must contain at least one special character';
        }

        return ''; // No validation error
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
        <div className='container-fluid'>
            <div style={{ width: "120px", height: "100%", marginRight: "142px" }}>
        {/* Your existing sidebar content */}
      </div>
            <div style={{ marginLeft: '250px', marginRight: '13px' }}>
                <br />
                <div>
                    <button className='button-5' style={{ float: 'right' }} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div>
                    <h2>Update Admin Account</h2>
                    <hr />
                </div>
            </div>
            
            <div style={{marginLeft:"100px"}}>
                  <MDBCard
                className='bg-white my-5 mx-auto'
                style={{ borderRadius: '1rem', maxWidth: '500px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                    {userData ? (
                        <div>
                            <h4>Admin Information</h4>
                            <hr />
                            {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                            {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
                            <p style={{ marginBottom: '1px' }}>
                                <b>Admin Email:</b> {userData.Email}
                            </p>
                            <p>
                                <b>Admin ID:</b> {userData.userId}
                            </p>

                            <MDBInput
                                label='First Name'
                                value={updatedUserData.FirstName}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, FirstName: e.target.value })}
                                className={validationError && !updatedUserData.FirstName ? 'border border-danger' : ''}
                            />
                            <MDBInput
                                label='Last Name'
                                value={updatedUserData.LastName}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, LastName: e.target.value })}
                                className={validationError && !updatedUserData.LastName ? 'border border-danger' : ''}
                            />
                            <MDBInput
                                label='Username'
                                value={updatedUserData.Username}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, Username: e.target.value })}
                                className={validationError && !updatedUserData.Username ? 'border border-danger' : ''}
                            />
                            <MDBInput
                                label='Password'
                                placeholder='Input new Password'
                                type='password'
                                value={updatedUserData.Password}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, Password: e.target.value })}
                                className={validationError && !updatedUserData.Password ? 'border border-danger' : ''}
                            />
                            {validationError && !updatedUserData.Password && (
                                <p style={{ color: 'red', marginTop: '0.5rem' }}>{validationError}</p>
                            )}
                            <hr />
                            <Button className='register' onClick={handleUpdate}>
                                Update User
                            </Button>
                        </div>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </MDBCardBody>
            </MDBCard>
            </div>
            <hr style={{marginLeft:"250px", marginRight:"13px"}}/><br />
        </div>
    );
}


export default UpdateAdminAccount;
