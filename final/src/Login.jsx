import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Slogo from "./picsrc/buksupic.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

    const handleGoogleLogin = () => {
      // Redirect to the server route that initiates the Google OAuth flow
      window.location.href = 'http://localhost:3001/auth/google';
    };

  return ( 
  
       <MDBContainer fluid className='background'>
         
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <img src={Slogo} alt="buksu logo" className='center-image' />
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn size='lg'>
                Login
              </MDBBtn>

              <hr className="my-4" />

            
              <button onClick={handleGoogleLogin}>Log In With Google</button>
              {/* <button to="/auth/google" className='btn red darken-1'>
                <i className="fab fa-google left"></i> Log In With Google
              </button> */}
              {/* <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'} }>
                <MDBIcon fab icon="google" className="mx-2"/>
                Sign in with google
              </MDBBtn> */}

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
   
   
  );
}

export default Login;