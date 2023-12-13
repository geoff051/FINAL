import React, { useState } from "react";
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

function InputNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    try {
      // Check if the password and confirm password match
      if (password !== confirmPassword) {
        setPasswordStatus('Password Does not Match');
        return;
      }
  
      // Extract adminId from the URL
      const searchParams = new URLSearchParams(location.search);
      const adminId = searchParams.get('id');
  
      // Send a request to the server to update the password
      const response = await fetch('http://localhost:3001/reset/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminId, password }),
      });
  
      const result = await response.json();
  
      // Update the state based on the server response
      setPasswordStatus(result.message);
  
      // Redirect to the login page if the password is updated successfully
      if (result.success) {
        navigate('/'); // Adjust the path accordingly
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordStatus('Error updating password');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <br /><br /><br /><br />
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <center><h4>Set new Password</h4></center>
              <br />
              <MDBInput
                wrapperClass='mb-4 w-100'
                placeholder="Password"
                id='formControlLg1'
                type='password'
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <MDBInput
                wrapperClass='mb-4 w-100'
                placeholder="Confirm Password"
                id='formControlLg2'
                type='password'
                size="lg"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <button className="button-37" role="button" onClick={handleSubmit}>
                Submit
              </button>
              {passwordStatus && <div className="mt-2" style={{color: "red"}}>{passwordStatus}</div>}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default InputNewPassword;
