import React, { useState, useEffect } from 'react';


import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerificationAdmin = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    const token = query.get('token');

    const onClick = async () => {
        try {
          const verificationResult = await axios.post("http://localhost:3001/admin/verificationAdmin", { id, token });
      
          if (verificationResult.data.success) {
            alert("Successfully Verified your account! You can now Log in");
          } else {
            alert(verificationResult.data.message || 'Verification failed. Please try again or contact support.');
          }
        } catch (error) {
          console.error("Error verifying account:", error);
          alert("Error verifying account. Please try again or contact support.");
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

export default VerificationAdmin;