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

function UpdateTeacher() {

  const [validated, setValidated] = useState(false);
  const current = new Date().toISOString().split("T")[0]
  const { id } = useParams()

  const [Firstname, setFirstname] = useState('')
  const [Lastname, setLastname] = useState('')
  const [Middlename, setMiddlename] = useState('')
  const [DOB, setDOB] = useState('')
  const [Street, setStreet] = useState('')
  const [Barangay, setBarangay] = useState('')
  const [City, setCity] = useState('')
  const [Province, setProvince] = useState('')
  const [GradeHandled, setGrade] = useState('')
  const [SectionHandled, setSection] = useState('')
  const [Contact, setContact] = useState('')

  const [allSections, setallSections] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [isSectionAssigned, setIsSectionAssigned] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [birthdayError, setBirthdayError] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3001/teacher/' + id)
      .then(result => {
        console.log(result)
        setFirstname(result.data.Firstname)
        setLastname(result.data.Lastname)
        setMiddlename(result.data.Middlename)
        setDOB(result.data.DOB)
        setStreet(result.data.Street)
        setBarangay(result.data.Barangay)
        setCity(result.data.City)
        setProvince(result.data.Province)
        setGrade(result.data.GradeHandled)
        setSection(result.data.SectionHandled)
        setContact(result.data.Contact)
        setCurrentSection(result.data.SectionHandled);
      })
      .catch(err => console.log(err))
  }, [])



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


  const Update = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      if (form.checkValidity() === false || (SectionHandled === '' && isSectionAssigned)) {
        e.stopPropagation();
      } else {
        await axios.put(`http://localhost:3001/teacher/${id}`, {
          Firstname,
          Lastname,
          Middlename,
          DOB,
          Street,
          Barangay,
          City,
          Province,
          GradeHandled,
          SectionHandled,
          Contact,
        });

        window.location.reload();
        alert("Teacher Info Updated Successfully!");
        setValidated(true);
      }
    } catch (error) {
      console.error("Error updating teacher information:", error);
      // Handle the error as needed, e.g., display an error message to the user
    }
  };


  const isValidContactNumber = (contactNumber) => {
    const contactNumberPattern = /^(09|\+639)\d{9}$/;
    return contactNumberPattern.test(contactNumber);
  };

  useEffect(() => {
    // Check if the selected date is not past 1923
    const birthYear = new Date(DOB).getFullYear();
    setBirthdayError(birthYear < 1923);
  }, [DOB]);


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
          <h2>Update Student Information</h2>
          <hr />
        </div>
      </div>

      <div style={{ marginLeft: '250px' }}>

        <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1200px' }}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            <h4>Personal Information</h4><hr />
            <Form noValidate validated={validated} onSubmit={Update}>
              <p><b>Name</b></p>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    value={Firstname}
                    onChange={(e) => setFirstname(e.target.value)}

                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    value={Lastname}
                    onChange={(e) => setLastname(e.target.value)}

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
                      value={Middlename}
                      onChange={(e) => setMiddlename(e.target.value)}
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
                      name="birthdate"
                      min="1923-01-01"
                      max={current}
                      value={DOB}
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
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    required
                    value={Street}
                    onChange={(e) => setStreet(e.target.value)} 
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
                    value={Barangay}
                    onChange={(e) => setBarangay(e.target.value)} />
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
                    value={City}
                    onChange={(e) => setCity(e.target.value)} />
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
                    value={Province}
                    onChange={(e) => setProvince(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Province.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <br />  <h4>Class Handled</h4><hr />
              <Row className="mb-3">

                <Form.Group as={Col} md="3" controlId="validationCustom08">
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => {
                      const selectedSection = allSections.find(section => section.SectionName === e.target.value);
                      if (selectedSection) {
                        setSection(selectedSection.SectionName);
                        // Set GradeHandled to the Gradelvl of the selected section
                        setGrade(selectedSection.Gradelvl);
                      }
                    }}
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
                    <div style={{ color: 'red' }}>
                      {SectionHandled === currentSection
                        ? ''
                        : 'Section is already assigned to a teacher. Please pick another section.'}
                    </div>
                  )}
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

              </Row>
              <br /> <h4>Contact Details</h4><hr />
              <Row>
                <Form.Group as={Col} md="4" controlId="validationCustom13">
                  <Form.Label>Contact Number</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="tel"
                      placeholder="Contact Number"
                      required
                      value={Contact}
                      onChange={(e) => setContact(e.target.value)}
                      isInvalid={!isValidContactNumber(Contact)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please input a correct Philippine contact number (e.g., 09123456789 or +639123456789).
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>



              <br />
              <Button type="submit" style={{ backgroundColor: '#198754', border: '#176c1b' }}>Submit form</Button>

            </Form>


          </MDBCardBody>

        </MDBCard>

      </div>
      <hr style={{ marginLeft: "250px", marginRight: "13px" }} /><br />
      <div style={{ width: "10px", height: "100%", marginRight: "10px" }}>
        {/* Your existing sidebar content */}
      </div>
    </div>


  )
}

export default UpdateTeacher;