import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function ClassListAdmin() {
  const [sections, setSections] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/section");
      setSections(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/section/${id}`);
      fetchData(); // Refetch data after deletion
    } catch (err) {
      console.log(err);
    }
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
      <div style={{ width: "120px", height: "100%", marginRight: "142px" }}>
        {/* Your existing sidebar content */}
      </div>

      <div className="d-flex flex-column" style={{marginLeft: '250px', marginRight:'13px'}}>

        <div>
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
            <h2>Section List</h2>
            <hr />
          </div>
        </div>

        <div
          className="headbg"
          style={{
            height: "110px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "10px",
          }}
        >
          <br />
          
            <Link to="/addClassList">
              <button className="button-27 mb-2" role="button">
                Add Class
              </button>
            </Link>
            
            <div style={{float:"right"}}>
              <input
                type="text"
                placeholder="Search Class"
                className="search form-control"
                style={{ float: "right", marginRight: "20px" }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          
          <br />
        </div>

        <br />
        <form
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "1200px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#e5fae9",
            margin: "0 auto", // Center the form on the screen
          }}
        >
          <div className="d-flex flex-wrap justify-content-start align-items-start">
            {sections
              .filter((section) => {
                return (
                  search.toLowerCase() === "" ||
                  section.SectionName.toLowerCase().includes(search)
                );
              })
              .sort((a, b) => (a.SectionName > b.SectionName ? 1 : -1))
              .map((section, index) => (
                <React.Fragment key={section._id}>
                  <MDBCard
                    className="bg-white my-3 mx-3"
                    style={{
                      borderRadius: "1rem",
                      maxWidth: "200px",
                      backgroundColor: "#F9F7DD",
                      margin: "0 auto",
                    }}
                  >
                    <MDBCardBody className="p-3 w-100 d-flex flex-column" style={{ backgroundColor: "whitesmoke", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px", }}>
                      <Link to={{
                        pathname: `/studentListSection/${section.SectionName}`,
                        state: { sectionData: sections }, // Pass section data
                      }}
                    >
                        <button
                          className="button-57 mb-2"
                          role="button"
                          type="submit"
                        >
                          <span className="text">{section.SectionName}</span>
                          <span style={{color: "white"}}>View</span>
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(section._id)}
                      >
                        Delete
                      </button>
                    </MDBCardBody>
                  </MDBCard>
                  {(index + 1) % 5 === 0 && <div className="w-100"></div>}
                </React.Fragment>
              ))}
          </div>
        </form>
        <hr />
      </div>

     
    </div>
  );
}

export default ClassListAdmin;
