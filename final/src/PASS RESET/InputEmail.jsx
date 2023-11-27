import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

function InputEmail() {
  const [Email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Send a request to the server to check if the email exists and send reset password link
      const response = await fetch('http://localhost:3001/reset/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email }),
      });

      const result = await response.json();

      // Update the state based on the server response
      setEmailStatus(result.message);

      // Redirect to the next page if the reset password link is sent successfully
      if (result.exists && result.message.includes('Email sent successfully')) {
        alert("A Link is Sent to you email to reset your password.")
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setEmailStatus('Error checking email');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <br /><br /><br /><br />
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <center><h4>Input Your Email for Password Reset</h4></center>
              <br />
              <MDBInput
                wrapperClass='mb-4 w-100'
                placeholder="Email"
                id='formControlLg1'
                type='email'
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
              />
              <button className="button-37" role="button" onClick={handleSubmit}>
                Submit
              </button>
              {emailStatus && <div className="mt-2">{emailStatus}</div>}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default InputEmail;
