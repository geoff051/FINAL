import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from 'axios'




function CreateStudent() {
  const [validated, setValidated] = useState(false);
  const current = new Date().toISOString().split("T")[0]
  const [values, setValues] = useState({});


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (
    <div className='background'>
        <h1><center>CREATE STUDENT</center></h1>
        <MDBCard  className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '1500px'}}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
             <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <p><b>Name</b></p>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom002">
          <Form.Label>Middlename</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Middlename"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Middlename.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <br /> <p><b>Birthdate</b></p>
      <Row className='mb-3'>
      <Form.Group as={Col} md="4" controlId="validationCustomDOB">
          <Form.Label>Date of Birth</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
            <Form.Control
              type="input"
              placeholder="Enter Birthdate"
              value = {values.birthdate} onChange={handleChange}
              name= 'birthdate'
              max= {current}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Birthdate.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

      <br />
      <p><b>Address</b></p>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Street</Form.Label>
          <Form.Control type="text" placeholder="Street" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Street.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Barangay</Form.Label>
          <Form.Control type="text" placeholder="Barangay" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Barangay.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid City.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom06">
          <Form.Label>Province</Form.Label>
          <Form.Control type="text" placeholder="Province" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Province.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

       <br /> <hr /> <p><b>Grade Level</b></p>
      <Row className="mb-3">
        <Form.Group as={Col} md="2" controlId="validationCustom07">
          <Form.Label>Grade</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Grade Level"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom08">
          <Form.Label>Section</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Section"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom09">
          <Form.Label>LRN</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="LRN"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Input LRN.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>

        <br /><p><b>Parent Information</b></p>
        <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom10">
          <Form.Label>Mothers Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Mothers Name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom11">
          <Form.Label>Fathers Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Fathers Name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Row>
        <Form.Group as={Col} md="4" controlId="validationCustom12">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Input Valid Email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom13">
          <Form.Label>Contact Number</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="tel"
              placeholder="Contact Number"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Input Correct Contact Number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        </Row>
        
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
    </div>
    
    
  );
}

export default CreateStudent;