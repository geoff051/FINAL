import React, { useState } from "react";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

function ClassListAdmin () {
    const [section, setSection] = useState([])


    useEffect(()=> {
        axios.get('http://localhost:3001/section')
        .then(result => setSection(result.data))
        .catch(err => console.log(err))

    },[])

    return (
        <div>
            <div className="d-flex vh-100 justify-content-center align-items-center">
            <MDBCard  className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '405px'}}>
        <MDBCardBody className='p-5 w-100 d-flex flex-column'>
       <Link to="/addClassList"><button className="button-27" role="button">Add Section</button></Link> <br />
        <table>
            <tbody>
                {section.sort( (a,b) => a.SectionName > b.SectionName ? 1 : -1).map((section) => {
                        return <tr>
                            <td>
                        <Link to={`/studentListSection/${section.SectionName}`}>
                        <button className="button-57" role="button" type="submit">
                        <span className="text">{section.SectionName}</span>
                        <span>View Class</span></button>
                        </Link>
                        
                            </td>
                        </tr>
                    })
                   }
           
            </tbody>
        </table>
            
        </MDBCardBody>
        </MDBCard>
                    
            
        </div>
        </div>
        
    )
}

export default ClassListAdmin;