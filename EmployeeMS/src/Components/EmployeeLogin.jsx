import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
  const [values,setValues]=useState({
    email: '',
    password: '',
  });

 const navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault(); 
    axios.defaults.withCredentials = true;
  
    axios.post('http://localhost:3000/employee/employeelogin', values) //  Send values
      .then((result) => {
        console.log("Response:", result);
        navigate('/employeedashboard')
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-danger'>
           
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email'  className='form-control rounded-0' autoComplete='off' onChange={(e)=>setValues({...values,email:e.target.value})}/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password'
                  className='form-control rounded-0' onChange={(e)=>setValues({...values,password:e.target.value})} />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
            <p>You are agree to aour terms and policies</p>
        </form>
    </div>
</div>
  )
}

export default EmployeeLogin
