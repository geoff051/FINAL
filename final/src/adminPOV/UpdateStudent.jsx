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





function UpdateStudent() {
  const [validated, setValidated] = useState(false);
  const current = new Date().toISOString().split("T")[0]
  const { id } = useParams()


  const [allSections, setallSections] = useState()
  const [sectionOptions, setSectionOptions] = useState([{ _id: '', SectionName: 'Choose a section' }]);
  const [sectionSelected, setSectionSelected] = useState(false);

  const [initialLRN, setInitialLRN] = useState('');
  const [isLRNTaken, setIsLRNTaken] = useState(false);
  const [isLRNChanged, setIsLRNChanged] = useState(false);
  const [initialSection, setInitialSection] = useState('');


  const [Firstname, setFirstname] = useState()
  const [Lastname, setLastname] = useState()
  const [Middlename, setMiddlename] = useState()
  const [DOB, setDOB] = useState()
  const [Street, setStreet] = useState()
  const [Barangay, setBarangay] = useState()
  const [City, setCity] = useState()
  const [Province, setProvince] = useState()
  const [Grade, setGrade] = useState()
  const [Section, setSection] = useState()
  const [LRN, setLRN] = useState()
  const [Mother, setMother] = useState()
  const [Father, setFather] = useState()
  const [PEmail, setPEmail] = useState()
  const [Contact, setContact] = useState()

  useEffect(() => {
    axios.get('http://localhost:3001/student/' + id)
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
        setGrade(result.data.Grade)
        setSection(result.data.Section)
        setLRN(result.data.LRN);
        setMother(result.data.Mother)
        setFather(result.data.Father)
        setPEmail(result.data.PEmail)
        setContact(result.data.Contact)
        setInitialLRN(result.data.LRN);
        setInitialSection(result.data.Section);
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsResponse = await axios.get('http://localhost:3001/student/all-sections');
        setallSections(sectionsResponse.data);

        setSectionOptions([
          { _id: '', SectionName: 'Choose a section' },
          ...sectionsResponse.data
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLRNChange = async (e) => {
    const lrnValue = e.target.value;
    setLRN(lrnValue);
    setIsLRNChanged(lrnValue !== initialLRN);

    // Check LRN only if it has changed from the initial value
    if (isLRNChanged) {
      try {
        const response = await axios.get(`http://localhost:3001/student/check-lrn/${lrnValue}`);
        const { isTaken } = response.data;
        setIsLRNTaken(isTaken);
      } catch (error) {
        console.error('Error checking LRN:', error);
      }
    }
  };

  const handleSectionDropdownClick = async () => {
    // Load sections when the dropdown is clicked
    try {
      const sectionsResponse = await axios.get('http://localhost:3001/student/all-sections');
      setSectionOptions([{ _id: '', SectionName: 'Choose a section' }, ...sectionsResponse.data]);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleSectionChange = (value) => {
    setSection(value);
    // Update the sectionSelected state when a section is chosen
    setSectionSelected(value !== 'Choose a section');
  };


  const fetchGradeFromSection = (selectedSection) => {
    const section = allSections.find((section) => section.SectionName === selectedSection);
    return section ? section.Gradelvl : '';
  };



  const Update = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();

    } else {
      const selectedGrade = fetchGradeFromSection(Section);

      axios.put("http://localhost:3001/student/" + id,
        {
          Firstname, Lastname, Middlename, DOB, Street, Barangay, City, Province,
          Section, LRN, Mother, Father, PEmail, Contact,
          Grade: selectedGrade
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))

      alert("Student Info Updated Successfully!")
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

        <MDBCard className='bg-white my-5 mx-auto' style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: '1rem', maxWidth: '1200px' }}>
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
                      name='birthdate'
                      min="1923-01-01"
                      max={current}
                      value={DOB}
                      onChange={(e) => setDOB(e.target.value)}
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
                    value={Street}
                    onChange={(e) => setStreet(e.target.value)} />
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

              <br /> <h4>Grade Level</h4><hr />
              <Row className="mb-3">

                <Form.Group as={Col} md="3" controlId="validationCustom08">
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    required
                    onClick={handleSectionDropdownClick}
                    onChange={(e) => handleSectionChange(e.target.value)}
                    value={sectionSelected ? Section : initialSection}
                  // className={sectionSelected ? 'is-valid' : 'is-invalid'}
                  >
                    {sectionOptions.map((section) => (
                      <option
                        key={section._id}
                        value={section.SectionName}
                      >
                        {section.SectionName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  {validated && !sectionSelected && (
                    <div className="text-danger mt-2">Please choose a section.</div>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom09">
                  <Form.Label>LRN</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="LRN"
                      required
                      pattern="[0-9]{12}"
                      value={LRN}
                      onChange={handleLRNChange}
                      isInvalid={isLRNTaken && isLRNChanged}
                    />
                    <Form.Control.Feedback type="invalid">
                      {isLRNTaken && isLRNChanged
                        ? 'LRN is already taken. Please choose a different LRN.'
                        : 'Please Input 12 digit LRN.'}
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
                    value={Mother}
                    onChange={(e) => setMother(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom11">
                  <Form.Label>Fathers Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Fathers Name"
                    value={Father}
                    onChange={(e) => setFather(e.target.value)}
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
                        value={PEmail}
                        onChange={(e) => setPEmail(e.target.value)}
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
                        pattern="^(09|\+639)\d{9}$"
                        value={Contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Input Correct Contact Number.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

              </Row>

              <Button type="submit" style={{ backgroundColor: '#198754', border: '#176c1b' }}>Submit form</Button>

            </Form>


          </MDBCardBody>

        </MDBCard>

      </div>
      <br />
    </div>


  );
}

export default UpdateStudent;