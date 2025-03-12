import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [admin,setAdmin]=useState([]);
  const [adminCount,setAdminCount]=useState(0);
  const [employeeCount,setEmployeeCount]=useState(0);
  const [salarySum,setSalarySum]=useState(0);
  
  useEffect(()=>{
    adminTotal();
    employeeTotal();
    salaryTotal();
  },[])

  const adminTotal=()=>{
    axios.get('http://localhost:3000/auth/admin_count')
    .then((result)=>{
      setAdminCount(result.data.adimcount);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const employeeTotal=()=>{
    axios.get('http://localhost:3000/auth/employee_count')
    .then((result)=>{
      setEmployeeCount(result.data.employeecount);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const salaryTotal=()=>{
    axios.get('http://localhost:3000/auth/salary_sum')
    .then((result)=>{
      setSalarySum(result.data.sumsalary);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/get_all_admin')
    .then((result)=>{
      if (result.data.status) {
        setAdmin(result.data.result); 
       // console.log(result.data.result);
      } else {
        console.log("No admins found");
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])

  return (
    <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Admin</h4>
        </div>
        <hr />
        <div className=''>
          <h5>Total: {adminCount}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Employee</h4>
        </div>
        <hr />
        <div className=''>
          <h5>Total: {employeeCount} </h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Salary</h4>
        </div>
        <hr />
        <div className=''>
          <h5>Total: {salarySum}</h5>
        </div>
      </div>
    </div>

    {/* List of admin  */}
    <div className='mt-4 px-5 pt-3'>
      <h3>List of Admins</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((a)=>(
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td> 
              <button className="btn btn-danger">Delete</button>
              <button className="btn btn-primary mx-2">Edit</button>
              </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Home
