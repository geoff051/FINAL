import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./userSlice";


function StudentListAdmin(){

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    console.log(useSelector(state => state.users.users));

    useEffect(()=> {
        const fetchData = async() => {
          try {
            const response = await axios.get('http://localhost:3001');
            dispatch(getUser(response.data));
        } catch(err) {
            console.log(err)
          }
        }
        fetchData();
      }, [])
      

    return(
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounder p-3">
            <button className="btn btn-success btn-sm">
                ADD +
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Section</th>
                        <th>LRN</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                           return <tr>
                                <td>{user.Firstname}</td>
                                <td>{user.Grade}</td>
                                <td>{user.Section}</td>
                                <td>{user.LRN}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger">Update</button>
                                    <button className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

    </div>
    )
}

export default StudentListAdmin;