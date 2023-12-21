import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './StyleTPOV.css'

function GenerateAttendanceReport() {
  const [validatedSingleDate, setValidatedSingleDate] = useState(false);
  const [validatedDateRange, setValidatedDateRange] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [singleDate, setSingleDate] = useState('');
  const [error, setError] = useState('');
  const [showSingleDateModal, setShowSingleDateModal] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [attendanceReportData, setAttendanceReportData] = useState(null);
  const [singleDateError, setSingleDateError] = useState('');
  const [dateRangeError, setDateRangeError] = useState('');

  const handleSubmitSingleDate = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || !singleDate) {
      setValidatedSingleDate(true);
      setValidatedDateRange(false); // Set the other form to false to clear its error
      setSingleDateError(singleDate ? 'Please fill in all required fields.' : 'Please select a single date.');
      return;
    }

    setValidatedSingleDate(false);
    setSingleDateError('');

    try {
      const response = await axios.get(`http://localhost:3001/attendanceReport/getReports/single`, {
        params: { date: singleDate },
        withCredentials: true,
      });

      const responseData = response.data;

      if (responseData && responseData.reports.length > 0) {
        setAttendanceReportData(responseData.reports);
        setShowSingleDateModal(true);
      } else {
        console.log("No attendance data available for this date.");
        setSingleDateError('No attendance data available for this date.');
      }
    } catch (error) {
      console.error('Error fetching attendance reports:', error);
      setSingleDateError('Error fetching attendance reports.');
    }
  };

  const handleSubmitDateRange = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || !fromDate || !untilDate) {
      setValidatedDateRange(true);
      setValidatedSingleDate(false); // Set the other form to false to clear its error
      setError(fromDate && untilDate ? 'Please fill in all required fields.' : 'Please select both dates.');
      setDateRangeError('');
      return;
    }

    const fromDateObj = new Date(fromDate);
    const untilDateObj = new Date(untilDate);

    if (fromDateObj > untilDateObj) {
      setValidatedDateRange(true);
      setError('');
      setDateRangeError('From date must be before the until date.');
      return;
    }

    setValidatedDateRange(false);
    setError('');

    try {
      const response = await axios.get(`http://localhost:3001/attendanceReport/getReports/multiple`, {
        params: { fromDate, untilDate },
        withCredentials: true,
      });

      const dataToCheck = response.data?.reports || [];

      if (dataToCheck.length > 0) {
        setAttendanceReportData(response.data);
        setShowDateRangeModal(true);
      } else {
        console.warn('No attendance data available for this date range.');
        setDateRangeError('No attendance data available for this date range.');
      }
    } catch (error) {
      console.error('Error fetching attendance reports for date range:', error);
      setDateRangeError('Error fetching attendance reports for date range.');
    }
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

  const SingleDateModal = () => {
    const dataToMap = attendanceReportData || [];
    const [currentPage, setCurrentPage] = useState(0);

    const entriesPerPage = 1;
    const totalPages = Math.ceil(dataToMap.length / entriesPerPage);

    const exportToExcel = async () => {
      try {
        const response = await axios.post('http://localhost:3001/attendanceReport/api/export-to-excel', {
          attendanceData: dataToMap
        }, {
          responseType: 'arraybuffer',  // Request the data as an array buffer
        });
    
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AttendanceReport.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error exporting to Excel:', error);
        // Handle error as needed
      }
    };

    const handleNextPage = () => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const handlePrevPage = () => {
      setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    return (
      <Modal show={showSingleDateModal} onHide={() => setShowSingleDateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Attendance Report for Single Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataToMap.length > 0 ? (
            <div>
              {dataToMap.slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage).map((entry, index) => (
                <div key={index}>
                  <h6>Date: {entry.Date}</h6>
                  <h6>Section: {entry.Section}</h6>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entry.Students.length > 0 ? (
                        entry.Students.map((student, studentIndex) => (
                          <tr key={studentIndex}>
                            <td>{entry.Section}</td>
                            <td>{entry.Date}</td>
                            <td>{`${student.Firstname} ${student.Lastname}`}</td>
                            <td>{student.Status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No attendance data available for this date.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              ))}
            </div>
          ) : (
            <p>{singleDateError || 'No attendance data available for this date.'}</p>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              <Button variant="outline-secondary" onClick={handlePrevPage} disabled={currentPage === 0}>
                Previous
              </Button>
              <span className="mx-2">{`Page ${currentPage + 1} of ${totalPages}`}</span>
              <Button variant="outline-secondary" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                Next
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSingleDateModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const DateRangeModal = () => {
    const dataToMap = attendanceReportData?.reports || [];
    const [currentPage, setCurrentPage] = useState(0);

    const entriesPerPage = 1;
    const totalPages = Math.ceil(dataToMap.length / entriesPerPage);

    const exportToExcel = async () => {
      try {
        const response = await axios.post('http://localhost:3001/attendanceReport/api/export-to-excel', {
          attendanceData: dataToMap
        }, {
          responseType: 'arraybuffer',  // Request the data as an array buffer
        });
    
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AttendanceReport.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error exporting to Excel:', error);
        // Handle error as needed
      }
    };

    const handleNextPage = () => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const handlePrevPage = () => {
      setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    return (
      <Modal show={showDateRangeModal} onHide={() => setShowDateRangeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Attendance Report for Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataToMap.length > 0 ? (
            <div>
              {dataToMap.slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage).map((dateData, dateIndex) => (
                <div key={dateIndex}>
                  <h6>Date: {dateData.Date}</h6>
                  <h6>Section: {dateData.Section}</h6>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dateData.Students.length > 0 ? (
                        dateData.Students.map((student, studentIndex) => (
                          <tr key={studentIndex}>
                            <td>{dateData.Section}</td>
                            <td>{dateData.Date}</td>
                            <td>{`${student.Firstname} ${student.Lastname}`}</td>
                            <td>{student.Status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">Attendance not checked on this day.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              ))}
            </div>
          ) : (
            <p>No attendance data available for the selected date range.</p>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              <Button variant="outline-secondary" onClick={handlePrevPage} disabled={currentPage === 0}>
                Previous
              </Button>
              <span className="mx-2">{`Page ${currentPage + 1} of ${totalPages}`}</span>
              <Button variant="outline-secondary" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                Next
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDateRangeModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={exportToExcel}>
            Export to Excel
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
          <h2>Generate Attendance Report</h2>
          <hr />
        </div>
      </div><br /><br />

      <div className="d-flex" style={{marginLeft:'250px'}}>
        <MDBCard className='bg-white my-5 mx-auto' style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",borderRadius: '1rem', maxWidth: '500px' }}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
          <h4>Generate Report for Single Date</h4> <hr />
          <Form noValidate validated={validatedSingleDate} onSubmit={handleSubmitSingleDate}>
            <Form.Group as={Col} md="5" controlId="validationCustom03">
              <Form.Label>Single Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Single Date"
                onChange={(e) => setSingleDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">{singleDateError || 'Please select a single date.'}</Form.Control.Feedback>
            </Form.Group> <br /><br /><br /><br />
            <Button type="submit" className="btn-success" style={{marginTop:"13px"}}>Generate Report</Button>
            {singleDateError && <p style={{ color: 'red' }}>{singleDateError}</p>}
          </Form>
        </MDBCardBody>
      </MDBCard>

      <MDBCard className='bg-white my-5 mx-auto' style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",borderRadius: '1rem', maxWidth: '500px' }}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
          <h4>Generate Report for Multiple Dates</h4> <hr />
          <Form noValidate validated={validatedDateRange} onSubmit={handleSubmitDateRange} className="mt-3">
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                placeholder="From Date"
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">{dateRangeError || 'Please select the From date.'}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                placeholder="Until Date"
                onChange={(e) => setUntilDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">{dateRangeError || 'Please select the Until date.'}</Form.Control.Feedback>
            </Form.Group> <br />
            <Button type="submit" className="btn-success">Generate Report</Button>
            {dateRangeError && <p style={{ color: 'red' }}>{dateRangeError}</p>}
          </Form>
        </MDBCardBody>
      </MDBCard>

      <SingleDateModal />
      <DateRangeModal />
      </div>
      
    </div>
  );
}

export default GenerateAttendanceReport;