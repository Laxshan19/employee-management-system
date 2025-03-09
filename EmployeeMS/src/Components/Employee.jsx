import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Employee = () => {
  const [employee,setEmployee]=useState([])
  useEffect(()=>{
     axios.get("http://localhost:3000/auth/get_employee")
     .then((result)=>{
      console.log("API response:",result.data.result);
      setEmployee(result.data.result)
     })
     .catch((error)=>{
      console.error("Error fetching categories:",error);
     })
  },[])

  const handleDelete=(id)=>{
   axios.get(`http://localhost:3000/auth/delete_employee/${id}`)
   .then((result)=>{
        console.log(result.data);
        setEmployee(employee.filter((emp) => emp.id !== id)); //  Remove deleted employee
   })
   .catch((error)=>{console.error(error)})
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {employee.length > 0 ? (
              employee.map((e, index) => (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="employee_image"
                  />
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  > Delete
                  </button>
                  </td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan="2">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
