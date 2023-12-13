import React, { useState, useEffect } from 'react';
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


  const handleGoogleLogin = async () => {
    try {
      console.log('Google login button clicked.');
      // Redirect to the Google authentication endpoint
      window.location.href = 'http://localhost:3001/auth/google';
  
      // The code after the redirection will only execute if the redirection is successful
      const response = await axios.get('http://localhost:3001/auth/token');
      const teacherToken = response.data.teacherToken;
  
      console.log('Teacher token:', teacherToken);
  
      localStorage.setItem('teacherToken', teacherToken);
    } catch (error) {
      console.error('Google login failed:', error);
    }
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
      const { token, verified, AdminToken, userData } = response.data;
  
      
      localStorage.setItem('Admintoken', AdminToken);
      localStorage.setItem('AdminUserData',  JSON.stringify(userData));
      console.log('Token saved in local storage:', localStorage.getItem('Admintoken'));
      console.log('User Data saved in local storage:', localStorage.getItem('AdminUserData'))

      if (!verified) {
        // If the account is not verified, show a message
        setLoginError('Account not verified. Please check your email for verification.');
        return;
      }
  
      // Redirect to the admin homepage
      navigate('/adminHomepage');
      window.location.reload()
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
