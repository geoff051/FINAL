import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from 'axios'
import { Link } from 'react-router-dom';




function CreateTeacher() {
  const [validated, setValidated] = useState(false);
  const current = new Date().toISOString().split("T")[0]
  const [error, setError] = useState(null);

  const [allSections, setallSections] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [isSectionAssigned, setIsSectionAssigned] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);


  const [Firstname, setFirstname] = useState()
  const [Lastname, setLastname] = useState()
  const [Middlename, setMiddlename] = useState()
  const [DOB, setDOB] = useState()
  const [Street, setStreet] = useState()
  const [Barangay, setBarangay] = useState()
  const [City, setCity] = useState()
  const [Province, setProvince] = useState()
  const [GradeHandled, setGradeHandled] = useState()
  const [SectionHandled, setSectionHandled] = useState()
  const [Email, setEmail] = useState()
  const [Contact, setContact] = useState()




  useEffect(() => {
    const checkSectionAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/teacher/check-section-assignment/${SectionHandled}`);
        setIsSectionAssigned(response.data.isSectionAssigned);
      } catch (error) {
        console.error('Error checking section assignment:', error);
      }
    };

    if (SectionHandled) {
      checkSectionAssignment();
    }
  }, [SectionHandled]);

  useEffect(() => {
    // Check if the selected date is not past 1923
    const birthYear = new Date(DOB).getFullYear();
    setBirthdayError(birthYear < 1923);
  }, [DOB]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsResponse = await axios.get('http://localhost:3001/teacher/all-sections');
        setallSections(sectionsResponse.data);

        const teachersResponse = await axios.get('http://localhost:3001/teacher/all-teachers');
        setAllTeachers(teachersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teacher/all-sections');
        console.log(response.data); // Add this line

        const sectionHandled = SectionHandled; // Assuming SectionHandled is the selected section
        const sectionAlreadyAssigned = response.data.some(section => section.SectionName === sectionHandled);

        if (sectionAlreadyAssigned) {
          setError("Section is already assigned to a teacher. Please pick another section.");
        }

        setallSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const selectedSection = allSections.find(section => section.SectionName === SectionHandled);

        // Update the Grade state with the Grade Level from the selected Section
        setGradeHandled(selectedSection.Gradelvl);

        const response = await axios.post("http://localhost:3001/teacher", {
          Firstname, Lastname, Middlename, DOB, Street, Barangay, City, Province,
          SectionHandled, Email, Contact,
          GradeHandled: selectedSection.Gradelvl
        });
        console.log(response);
        window.location.reload()
        alert("Teacher Created Successfully!");
      } catch (err) {
        if (err.response && err.response.status === 400 && err.response.data.field === "Email") {
          // Update the state with the error message
          setError("Email already exists");
        } else {
          console.error(err);
        }
      }
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
          <h2>Create Teacher</h2>
          <hr />
        </div>
      </div>

      <div style={{ marginLeft: '250px' }}>
        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1200px' }}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            <h4>Personal Information</h4><hr />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <p><b>Name</b></p>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    pattern="[A-Za-z ]+"
                    onChange={(e) => setFirstname(e.target.value)}

                  />
                  <Form.Control.Feedback type="invalid">
                    Please Input Valid First Name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    pattern="[A-Za-z ]+"
                    onChange={(e) => setLastname(e.target.value)}

                  />
                  <Form.Control.Feedback type="invalid">
                    Please Input Valid Last Name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom002">
                  <Form.Label>Middlename</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Middlename"
                      pattern="[A-Za-z ]+"
                      onChange={(e) => setMiddlename(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Input Valid Middlename
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
                      min="1923-01-01"
                      max={current}
                      onChange={(e) => {
                        setDOB(e.target.value);
                        // Check if the selected date is not past 1923
                        if (new Date(e.target.value) > new Date("1923-01-01")) {
                          setBirthdayError(true);
                        } else {
                          setBirthdayError(false);
                        }
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {birthdayError
                        ? 'Please choose a Birthdate not past 1923.'
                        : 'Please choose a valid Birthdate.'}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <br />
              <p><b>Address</b></p>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                  <Form.Label>Street</Form.Label>
                  <Form.Control type="text" placeholder="Street" required pattern="^[a-zA-Z0-9\s, ]+$"
                    onChange={(e) => setStreet(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Street.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>Barangay</Form.Label>
                  <Form.Control type="text" placeholder="Barangay" required pattern="^[a-zA-Z0-9\s, ]+$"
                    onChange={(e) => setBarangay(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Barangay.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" required pattern="^[a-zA-Z0-9\s, ]+$"
                    onChange={(e) => setCity(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid City.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom06">
                  <Form.Label>Province</Form.Label>
                  <Form.Control type="text" placeholder="Province" required pattern="^[a-zA-Z0-9\s, ]+$"
                    onChange={(e) => setProvince(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Province.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <br /> <h4>Class Handled</h4><hr />
              <Row className="mb-3">

                <Form.Group as={Col} md="3" controlId="validationCustom08">
                  <Form.Label>Section Handled</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => setSectionHandled(e.target.value)}
                    value={SectionHandled || ''} // Set the value to an empty string if SectionHandled is undefined
                  >
                    <option value="" disabled>Select Section</option> {/* Add this line */}
                    {allSections.map((section) => (
                      <option
                        key={section._id}
                        value={section.SectionName}
                        style={{
                          color:
                            allTeachers.some(
                              (teacher) => teacher.SectionHandled === section.SectionName
                            ) ? 'red' : 'black'
                        }}
                      >
                        {section.SectionName}
                      </option>
                    ))}
                  </Form.Select>
                  {isSectionAssigned && (
                    <div style={{ color: 'red' }}>Section is already assigned to a teacher. Please pick another section.</div>
                  )}
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <br /> <h4>Contact Detail</h4><hr />
              <Row>
                <Form.Group as={Col} md="4" controlId="validationCustom12">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Input Valid Email.
                    </Form.Control.Feedback>
                  </InputGroup>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom13">
                  <Form.Label>Contact Number</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="tel"
                      placeholder="Contact Number"
                      required
                      pattern="^(09|\+639)\d{9}$"
                      onChange={(e) => setContact(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please input a correct Philippine contact number (e.g., 09123456789 or +639123456789).
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <br />



              <Button type="submit" style={{ backgroundColor: "#198754", border: "2px solid #176c1b" }}>Submit form</Button>

            </Form>


          </MDBCardBody>

        </MDBCard>
      </div>

      <hr style={{ marginLeft: "250px", marginRight: "13px" }} /><br />
    </div>


  );
}

export default CreateTeacher;