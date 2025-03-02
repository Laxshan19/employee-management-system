import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

const Login = () => {
    const [values,setValues]=useState({
        email:'',
        password:'',
    })

    const handleSubmit=(event)=>{
        event.preventDefalut()
        axios.post('http://localhost:3000/auth/adminlogin',values)
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
        <div className='text-danger'>
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" onChange={(e)=>setValues({...values,email:e.target.value})} placeholder='Enter Email' name='email' className='form-control rounded-0' autoComplete='off'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" onChange={(e)=>setValues({...values,password:e.target.value})} placeholder='Enter Password' name='password' className='form-control rounded-0' />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
            <p>You are agree to our terms and policies</p>
        </form>
      </div>
    </div>
  );
};

export default Login;