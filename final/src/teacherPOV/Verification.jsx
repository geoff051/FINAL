import React, { useState, useEffect } from 'react';


import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Verification() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const id = params.get('id');

    if (!token || !id) {
      setError('Invalid URL parameters. Please check your verification link.');
      return;
    }

    axios.post(`http://localhost:3001/teacher/verify`, { token, id })
      .then((response) => {
        console.log(response.data);
        setVerified(true);
      })
      .catch((error) => {
        console.error(error);
        setError('Verification failed. Please try again or contact support.');
      });
  });

  const onClick = () => {
    if (verified) {
      alert('Successfully Verified your account! You can now Log in');
    } else {
      alert(error || 'Verification failed. Please try again or contact support.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>PLEASE CLICK THE BUTTON TO VERIFY YOUR ACCOUNT</h1>
      <div>
        <button type="button" className="btn btn-outline-success btn-lg" onClick={onClick}>
          VERIFY
        </button>
      </div>
    </div>
  );
}

export default Verification;