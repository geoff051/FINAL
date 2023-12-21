import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from "axios";
import "./style.css"

function AddClassList() {
  const [validated, setValidated] = useState(false);

  const [SectionName, setSectionName] = useState()
  const [Gradelvl, setGradelvl] = useState()

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      axios.post("http://localhost:3001/section", { SectionName, Gradelvl })
        .then(result => {
          console.log(result);
          alert("Section Created Successfully!");
          window.location.reload()
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            setError("Error: Section name already exists");
          } else {
            console.error(error);
            setError("Error creating section");
          }
        });
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
          <h2>Create Section</h2>
          <hr />
        </div>
      </div>


      <MDBCard className='bg-white my-5 mx-auto' style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: '1rem', maxWidth: '550px' }}>

        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
          <h2>Section</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && (
              <Form.Text className="text-danger">{error}</Form.Text>
            )}

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Section Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Section name"
                  onChange={(e) => setSectionName(e.target.value)}

                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Grade Level</Form.Label>
                <div className="input-group">
                  <Form.Control
                    as="select"
                    required
                    onChange={(e) => setGradelvl(e.target.value)}
                    className="custom-select"
                  >
                    <option value="" disabled selected>Select Grade Level</option>
                    <option value="k1">K1</option>
                    <option value="k2">K2</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </Form.Control>
                  <div className="arrow-down"></div>
                </div>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

            </Row>




            <Button type="submit" style={{ backgroundColor: '#198754', border: '#176c1b' }}>Submit form</Button>

          </Form>


        </MDBCardBody>


      </MDBCard>


    </div>

  )
}

export default AddClassList;