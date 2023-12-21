import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from 'axios'
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

  const [errorMessages, setErrorMessages] = useState({
    Firstname: '',
    Lastname: '',
    Middlename: '',
    DOB: '',
    Street: '',
    Barangay: '',
    City: '',
    Province: '',
    GradeHandled: '',
    SectionHandled: '',
    Email: '',
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
    setValidated(true); // Trigger form validation

    // Check if the form is valid
    if (!e.currentTarget.checkValidity()) {
      return;
    }

    let isFormValid = true;
    const newErrorMessages = { ...errorMessages };

    if (!teacherData.Firstname) {
      newErrorMessages.Firstname = 'Please enter your First Name.';
      isFormValid = false;
    } else {
      newErrorMessages.Firstname = '';
    }

    if (!teacherData.Lastname) {
      newErrorMessages.Lastname = 'Please enter your Last Name.';
      isFormValid = false;
    } else {
      newErrorMessages.Lastname = '';
    }

    if (!teacherData.DOB) {
      newErrorMessages.DOB = 'Please enter your Date of Birth.';
      isFormValid = false;
    } else {
      newErrorMessages.DOB = '';
    }

    if (!teacherData.Street) {
      newErrorMessages.Street = 'Please enter your Street.';
      isFormValid = false;
    } else {
      newErrorMessages.Street = '';
    }

    if (!teacherData.Barangay) {
      newErrorMessages.Barangay = 'Please enter your Barangay.';
      isFormValid = false;
    } else {
      newErrorMessages.Barangay = '';
    }

    if (!teacherData.City) {
      newErrorMessages.City = 'Please enter your City.';
      isFormValid = false;
    } else {
      newErrorMessages.City = '';
    }

    if (!teacherData.Province) {
      newErrorMessages.Province = 'Please enter your Province.';
      isFormValid = false;
    } else {
      newErrorMessages.Province = '';
    }

    if (!teacherData.Contact) {
      newErrorMessages.Contact = 'Please enter your Contact Number.';
      isFormValid = false;
    } else {
      newErrorMessages.Contact = '';
    }

    setErrorMessages(newErrorMessages);

    if (isFormValid) {
      axios.put(`http://localhost:3001/teacher/${id}`, teacherData)
        .then(result => {
          console.log(result);
          alert("Personal Information Updated Successfully! For the Changes To take effect please Log in again.");
          window.location.reload();
          setValidated(false);
        })
        .catch(err => console.log(err));
    }
  };

  const validatePhilippineCellNumber = (contact) => {
    // Regular expression for a Philippine cell number
    const regex = /^(09|\+639)\d{9}$/;
    return regex.test(contact);
  };

  const handleContactChange = (contactValue) => {
    setTeacherData({ ...teacherData, Contact: contactValue });

    // Validate the contact number
    const isValid = validatePhilippineCellNumber(contactValue);
    setErrorMessages({
      ...errorMessages,
      Contact: isValid ? '' : 'Please enter a valid Philippine cell number.',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('teacherToken');
    axios.get('http://localhost:3001/auth/logout', { withCredentials: true })
      .then(() => {

        console.log('Token removed from localStorage');

        navigate('/', { replace: true });
        console.log('Redirected successfully');

      })
      .catch(error => {

        console.error('Logout failed:', error);
      });
    window.location.reload();
  };

  return (
    <div className='container-fluid'>
      <div style={{ width: "120px", height: "100%", marginRight: "150px" }}>
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
          <h2>Update Student Information</h2>
          <hr />
        </div>
      </div>

      <div style={{ marginLeft: '250px' }}>
        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1200px' }}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            <h4>Personal Information</h4><hr />
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
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.Firstname}
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.Lastname}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom002">
                  <Form.Label>Middlename</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Middlename"
                      value={teacherData.Middlename}
                      onChange={(e) => setTeacherData({ ...teacherData, Middlename: e.target.value })}
                    />
                    <Form.Control.Feedback>
                      Looks Good!
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
                      name="birthdate"
                      max={current}
                      min="1923-01-01"
                      value={teacherData.DOB}
                      onChange={(e) => setTeacherData({ ...teacherData, DOB: e.target.value })}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessages.DOB}
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
                    {errorMessages.Street}
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
                    {errorMessages.Barangay}
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
                    {errorMessages.City}
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
                    {errorMessages.Province}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <br /><h4>Contact Detail</h4><hr />
              <Row>
                <Form.Group as={Col} md="4" controlId="validationCustom13">
                  <Form.Label>Contact Number</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="tel"
                      placeholder="Contact Number"
                      required
                      value={teacherData.Contact}
                      onChange={(e) => handleContactChange(e.target.value)}
                      isInvalid={errorMessages.Contact !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorMessages.Contact}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <br />
              <Button type="submit" style={{ backgroundColor: '#198754', border: '#176c1b' }} >Submit form</Button>

            </Form>


          </MDBCardBody>
          <center><p>PS. if you have any concern regarding your handled section please contact the admin.</p></center>
        </MDBCard>
      </div>

      <hr style={{ marginLeft: "250px", marginRight: "13px" }} /><br />
      <div style={{ width: "10px", height: "100%", marginRight: "10px" }}>
        {/* Your existing sidebar content */}
      </div>
    </div>
  )
}

export default TeacherPersonalUpdate;