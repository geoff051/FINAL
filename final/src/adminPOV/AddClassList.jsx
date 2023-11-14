import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from "axios";
import { Link } from "react-router-dom";

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
          alert("Student Created Successfully!")
        }
    
       setValidated(true);
      };

    return (
        <div className='background'>
        <h1><center>Add Section</center></h1>
        <MDBCard  className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '1500px'}}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
         
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <p><b>Section</b></p>
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

      

      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
      
      </Form>  
      
             
        </MDBCardBody>
     
    </MDBCard>

    <Link to="/classListAdmin"  className="backbutton">Back</Link>

    </div>
    )
}

export default AddClassList;