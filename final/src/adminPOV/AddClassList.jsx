import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from "axios";
import "./style.css"

function AddClassList(){
    const [validated, setValidated] = useState(false);

    const [SectionName, setSectionName] = useState()
    const [Gradelvl, setGradelvl] = useState()
    const [Adviser, setAdviser] = useState()

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
          
        } else{
          axios.post("http://localhost:3001/section", 
          {SectionName, Gradelvl, Adviser})
          .then(result => console.log(result))
          .catch(err => console.log(err))
          alert("Section Created Successfully!")
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
        <div style={{ width: "120px", height: "100%", marginRight: "150px"}}>
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
          <h2>Create Section</h2>
          <hr />
        </div>
      </div>


        <MDBCard  className='bg-white my-5 mx-auto' style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: '1rem', maxWidth: '600px'}}>
        
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
        <h2>Section</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

        
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Section Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Section name"
            onChange={(e) => setSectionName(e.target.value)}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Grade Level</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Grade Level"
            onChange={(e) => setGradelvl(e.target.value)}
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom002">
          <Form.Label>Adviser</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Adviser"
              required
              onChange={(e) => setAdviser(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose an Adviser.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      

      
      <Button type="submit" style={{backgroundColor:'#198754',border:'#176c1b'}}>Submit form</Button>
      
      </Form>  
      
             
        </MDBCardBody>
        

    </MDBCard>

    
    </div>
    
    )
}

export default AddClassList;