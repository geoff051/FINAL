import React, { useState, useEffect } from "react";
import axios from "axios";
import './StyleTPOV.css';



function AttendanceTracker() {
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [teacherData, setTeacherData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [attendanceCounts, setAttendanceCounts] = useState({
    Present: 0,
    Absent: 0,
    Late: 0,
    Excused: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:3001/teacher/api/userData', { withCredentials: true })
      .then(response => {
        console.log('User data response:', response.data);

        setTeacherData({
          id: response.data.id,
          additionalData: {
            ...response.data.additionalData,
          }
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data
        const response = await axios.get("http://localhost:3001/teacher/api/getStudent", { withCredentials: true });
        const responseData = response.data;

        // Set the state with the fetched data
        setTeacher(responseData.teacher);
        setStudents(responseData.students);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update attendance counts whenever statuses or students change
    updateAttendanceCounts();
  }, [statuses, students]);

  const handleStatusChange = (event, studentId) => {
    setStatuses(prevStatuses => ({
      ...prevStatuses,
      [studentId]: event.target.value
    }));
  };

  const updateAttendanceCounts = () => {
    const counts = {
      Present: 0,
      Absent: 0,
      Late: 0,
      Excused: 0,
    };

    students.forEach((student) => {
      counts[statuses[student._id]]++;
    });

    setAttendanceCounts(counts);
  };





  const handleSubmitAttendance = async () => {
    try {
      const section = teacherData.additionalData?.SectionHandled || "N/A";
  
      // Check if any student is missing a selected status
      const isMissingStatus = students.some(student => !statuses[student._id]);
  
      if (isMissingStatus) {
        alert("Please select a status for every student before submitting attendance.");
        return;
      }
  
      const dataToPost = {
        Section: section,
        Students: students.map(student => ({
          Firstname: student.Firstname,
          Lastname: student.Lastname,
          Status: statuses[student._id] || "N/A",
          Section: section,
          PEmail: student.PEmail, // Include parent's email
        }))
      };
  
      // Send a POST request to your server endpoint to save the data
      await axios.post("http://localhost:3001/attendanceReport/addReport", dataToPost, { withCredentials: true });
  
      console.log("Attendance submitted!");
      console.log("Attendance counts:", attendanceCounts);
  
      alert("Attendance submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
  
      alert("Error submitting attendance. Please try again.");
    }
  };
  
  

  return (
    <div className="background">
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="ftable">
          <h4 style={{ backgroundColor: '#48A14D', color: 'white', padding: '10px' }}>Section: {teacherData.additionalData?.SectionHandled || "N/A"} </h4>
          <table className="table">
            <thead style={{ backgroundColor: '#48A14D', color: 'white' }}>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Section</th>
                <th>LRN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id}>
                  <td>{student.Firstname} {student.Lastname}</td>
                  <td>{student.Grade}</td>
                  <td>{student.Section}</td>
                  <td>{student.LRN}</td>
                  <td>
                  <div className="select" tabIndex="1">
                      <select
                        className={`selectopt ${statuses[student._id]}`}
                        value={statuses[student._id] || "Select Status"}
                        onChange={(event) => handleStatusChange(event, student._id)}
                      >
                        <option value="Select Status" disabled>Select Status</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                        <option value="Excused">Excused</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div style={{ display: "flex", marginRight: "20px" }}>
          <div style={{ marginRight: "20px" }}>
            <p><b>Present:</b> {attendanceCounts.Present}</p>
            <p><b>Absent:</b> {attendanceCounts.Absent}</p>
          </div>
          <div>
            <p><b>Late:</b> {attendanceCounts.Late}</p>
            <p><b>Excused:</b> {attendanceCounts.Excused}</p>
          </div>

          <div> 
            <button className="submitbtn" style={{ float: "right", marginLeft: "300px" }} 
          onClick={handleSubmitAttendance}>Submit Attendance</button></div>
        </div>

         <hr />
        </div>
      </div>
    </div>
  )
}

export default AttendanceTracker;