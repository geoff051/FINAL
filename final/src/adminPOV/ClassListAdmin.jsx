import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from "axios";
import { Link } from "react-router-dom";

function ClassListAdmin() {
  const [sections, setSections] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://localhost:3001/section');
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

  return (
    <div className="d-flex" >
      <div style={{ width: "250px", height: "100%", marginRight: "150px" }}>
        {/* Your existing sidebar content */}
      </div>
      <div className="d-flex flex-column align-items-center" >
        <br /><br /><br />
        <form style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", width: "950px"}}>
          <Link to="/addClassList">
            <button className="button-27 mb-2" role="button">
              Add Class
            </button>
          </Link>
          <input
            type="text"
            placeholder="Search Class"
            className="search mb-2"
            style={{ float: "right", marginRight: "20px" }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="d-flex flex-wrap justify-content-start align-items-start">
            {sections
              .filter((section) => {
                return search.toLowerCase() === ''
                  ? section
                  : section.SectionName.toLowerCase().includes(search);
              })
              .sort((a, b) => (a.SectionName > b.SectionName ? 1 : -1))
              .map((section, index) => (
                <React.Fragment key={section._id}>
                  <MDBCard
                    className="bg-white my-3 mx-3"
                    style={{
                      borderRadius: '1rem',
                      maxWidth: '200px',
                      backgroundColor: "#F9F7DD",
                    }}
                  >
                    <MDBCardBody className="p-3 w-100 d-flex flex-column">
                      <Link to={`/studentListSection/${section.SectionName}`}>
                        <button className="button-57 mb-2" role="button" type="submit">
                          <span className="text">{section.SectionName}</span>
                          <span>View</span>
                        </button>
                      </Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(section._id)}>
                        Delete
                      </button>
                    </MDBCardBody>
                  </MDBCard>
                  {(index + 1) % 4 === 0 && <div className="w-100"></div>}
                </React.Fragment>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClassListAdmin;
