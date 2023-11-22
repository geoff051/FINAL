import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function TeacherPersonalUpdate() {

  const [validated, setValidated] = useState(false);
  const current = new Date().toISOString().split("T")[0]
  const { id } = useParams()

  const [teacherData, setTeacherData] = useState({
    Firstname: '',
    Lastname: '',
    Middlename: '',
    DOB: '',
    Street: '',
    Barangay: '',
    City: '',
    Province: '',
    Contact: '',
  });

  useEffect(() => {
    // Fetch teacher data based on the ID
    axios.get(`http://localhost:3001/teacher/${id}`)
      .then(result => {
        setTeacherData(result.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const updateTeacher = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Make a PUT request to update teacher data
      axios.put(`http://localhost:3001/teacher/${id}`, teacherData)
        .then(result => console.log(result))
        .catch(err => console.log(err));

      alert("Personal Information Updated Successfully!");
      setValidated(true);
    }
  };

  return (
    <div className='background'>
      <h1><center>UPDATE Personal Information</center></h1>
      <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1500px' }}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

          <Form noValidate validated={validated} onSubmit={updateTeacher}>
            <p><b>Name</b></p>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  value={teacherData.Firstname}
                  onChange={(e) => setTeacherData({ ...teacherData, Firstname: e.target.value })}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  value={teacherData.Lastname}
                  onChange={(e) => setTeacherData({ ...teacherData, Lastname: e.target.value })}
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
                    value={teacherData.Middlename}
                    onChange={(e) => setTeacherData({ ...teacherData, Middlename: e.target.value })}
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
                    type="date"
                    placeholder="Enter Birthdate"
                    name='birthdate'
                    max={current}
                    value={teacherData.DOB}
                    onChange={(e) => setTeacherData({ ...teacherData, DOB: e.target.value })}
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
                <Form.Control
                  type="text"
                  placeholder="Street"
                  required
                  value={teacherData.Street}
                  onChange={(e) => setTeacherData({ ...teacherData, Street: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Street.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Barangay</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Barangay"
                  required
                  value={teacherData.Barangay}
                  onChange={(e) => setTeacherData({ ...teacherData, Barangay: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Barangay.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  value={teacherData.City}
                  onChange={(e) => setTeacherData({ ...teacherData, City: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid City.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom06">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Province"
                  required
                  value={teacherData.Province}
                  onChange={(e) => setTeacherData({ ...teacherData, Province: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Province.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <br /><hr /><p><b>Contact Details</b></p><br />
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustom13">
                <Form.Label>Contact Number</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="tel"
                    placeholder="Contact Number"
                    required
                    value={teacherData.Contact}
                    onChange={(e) => setTeacherData({ ...teacherData, Contact: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Input Correct Contact Number.
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
      <Link to="/teacherInfoTeacher" style={{
        backgroundColor: 'blue',
        color: 'white',
        display: 'inline-block',
        textAlign: 'center',
        padding: '10px 20px',
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>Back</Link>
    </div>
  )
}

export default TeacherPersonalUpdate;
