import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import axios from 'axios';

function GenerateAttendanceReport() {
  const [validatedSingleDate, setValidatedSingleDate] = useState(false);
  const [validatedDateRange, setValidatedDateRange] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [singleDate, setSingleDate] = useState('');
  const [reportsSingleDate, setReportsSingleDate] = useState([]); // State for single date reports
  const [reportsDateRange, setReportsDateRange] = useState([]); // State for date range reports
  const [error, setError] = useState('');

  const handleSubmitSingleDate = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidatedSingleDate(true);
      setError('Please fill in all required fields.');
      return;
    }

    setValidatedSingleDate(false);
    setError('');

    try {
      // Handle generating report for a single date
      const response = await axios.get(`http://localhost:3001/attendanceReport/getReports/single`, {
        params: { date: singleDate },
        withCredentials: true
      });
      setReportsSingleDate(response.data); // Update reports for single date
    } catch (error) {
      console.error('Error fetching attendance reports:', error);
      setError('Error fetching attendance reports.');
    }
  };

  const handleSubmitDateRange = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidatedDateRange(true);
      setError('Please fill in all required fields.');
      return;
    }

    setValidatedDateRange(false);
    setError('');

    try {
      // Handle generating report for a date range
      const response = await axios.get(`http://localhost:3001/attendanceReport/getReports/multiple`, {
        params: { fromDate, untilDate },
        withCredentials: true
      });
      setReportsDateRange(response.data); // Update reports for date range
    } catch (error) {
      console.error('Error fetching attendance reports:', error);
      setError('Error fetching attendance reports.');
    }
  };



  const handleDownloadSingleDateReport = async () => {
    try {
      const response = await axios.get('http://localhost:3001/attendanceReport/downloadReport/single', {
        params: { date: singleDate },
        responseType: 'blob', // Important for downloading binary files
      });
  
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'attendance_report_single_date.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
      // Handle the error as needed
    }
  };
  
  const handleDownloadDateRangeReport = async () => {
    try {
      const response = await axios.get('http://localhost:3001/attendanceReport/downloadReport/multiple', {
        params: { fromDate, untilDate },
        responseType: 'blob', // Important for downloading binary files
      });
  
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'attendance_report_date_range.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <br />
      <h1><center>Generate Attendance Report</center></h1>

      {/* Single Date Form */}
      <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
        <h4>Generate Report for Single Dates</h4>
          <Form noValidate validated={validatedSingleDate} onSubmit={handleSubmitSingleDate}>
            
            <Form.Group as={Col} md="5" controlId="validationCustom03">
              <Form.Label>Single Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Single Date"
                onChange={(e) => setSingleDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Please select a single date.</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="gradient-custom-4 mt-3">Generate Report</Button>

          </Form>

          {error && <p style={{ color: 'red' }}>{error}</p>}

         
          {reportsSingleDate.length > 0 && (
            <Button type="button" className="gradient-custom-4 mt-3" onClick={handleDownloadSingleDateReport}>
              Download Single Date Report
            </Button>
          )}

          {/* Display reports for single date */}
          {Array.isArray(reportsSingleDate) && reportsSingleDate.length > 0 && (
            <div className="mt-3">
              <h2>Attendance Reports:</h2>
              <ul>
                {reportsSingleDate.map((report) => (
                  <li key={report._id}>
                    <p>Date: {report.Date}, Section: {report.Section}</p>
                    <ul>
                      {report.Students.map((student) => (
                        <li key={student._id}>
                          Student Name: {student.Firstname} {student.Lastname}, Status: {student.Status}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
        </MDBCardBody>
      </MDBCard>

      {/* Date Range Form */}
      <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
        <h4>Generate Report for Multiple Dates</h4>
          <Form noValidate validated={validatedDateRange} onSubmit={handleSubmitDateRange} className="mt-3">
            
            <Form.Group as={Col} md="5" controlId="validationCustom01">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                placeholder="From Date"
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Please select the From date.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="validationCustom02">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                placeholder="Until Date"
                onChange={(e) => setUntilDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Please select the Until date.</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="gradient-custom-4 mt-3">Generate Report</Button>

          </Form>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {reportsDateRange.length > 0 && (
            <Button type="button" className="gradient-custom-4 mt-3" onClick={handleDownloadDateRangeReport}>
              Download Date Range Report
            </Button>
          )}

          {/* Display reports for date range */}
          {Array.isArray(reportsDateRange) && reportsDateRange.length > 0 && (
            <div className="mt-3">
              <h2>Attendance Reports:</h2>
              <ul>
                {reportsDateRange.map((report) => (
                  <li key={report._id}>
                    <p>Date: {report.Date}, Section: {report.Section}</p>
                    <ul>
                      {report.Students.map((student) => (
                        <li key={student._id}>
                          Student Name: {student.Firstname} {student.Lastname}, Status: {student.Status}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default GenerateAttendanceReport;
