import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import Slogo from "./picsrc/barangay9Logo.jpg";
import './login.css';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [capVal, setCapVal] = useState(null);
  const [attemptedLogin, setAttemptedLogin] = useState(false); // New state variable
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  const handleLogin = async () => {
    try {
      setAttemptedLogin(true); // Set to true when the user attempts to log in
  
      if (!capVal) {
        // If captcha is not checked, show an error message
        setLoginError('Please check the captcha before logging in.');
        return;
      }
  
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const { token, verified } = response.data;
  
      // Handle the token (e.g., save it to local storage)
      localStorage.setItem('token', token);
  
      if (!verified) {
        // If the account is not verified, show a message
        setLoginError('Account not verified. Please check your email for verification.');
        return;
      }
  
      // Redirect to the admin homepage
      navigate('/adminHomepage');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'Unexpected error');
      setLoginError('Invalid username or password');
    }
  };
  
  return (
    <MDBContainer fluid className='background'>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <img src={Slogo} alt="buksu logo" className='center-image' />
              <h2 className="fw-bold mb-2 text-center">Barangay 9 <br />Elementary School</h2>
              <br />
              <MDBInput wrapperClass='mb-4 w-100' label='Username' id='formControlLg1' 
              type='email' size="lg" onChange={(e) => setUsername(e.target.value)} value={username} />

              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg2' 
              type='password' size="lg" onChange={(e) => setPassword(e.target.value)} value={password}/>

              <ReCAPTCHA
                sitekey='6Ld6axwpAAAAAKcBbrc2wKJuMxALH7HJg8Sdohok'
                onChange={(value) => setCapVal(value)}
              />
              <br />
              
              <button className="button-37" role="button" onClick={handleLogin}>Login</button>
             
              {loginError && <div className="text-danger mt-2">{loginError}</div>}
              
              <Link to="/inputEmail"><p>forgot password?</p></Link>

              <hr className="my-4" />

              <button type="button" className="google-sign-in-button" onClick={handleGoogleLogin}>Log In With Google</button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
