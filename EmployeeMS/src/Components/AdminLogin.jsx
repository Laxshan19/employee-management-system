import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import {useNavigate} from 'react-router-dom';


const AdminLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [error,setError]=useState(null)

const navigate=useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            console.log(result);
            if(result.data.loginStatus){
                navigate('/dashboard');
            }else{
                setError(result.data.Error)
            }
        })
        .catch(err => console.log("Error:", err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>{error && error}</div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            onChange={(e) => setValues({ ...values, email: e.target.value })} 
                            placeholder='Enter Email' 
                            className='form-control rounded-0' 
                            autoComplete='off' 
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            onChange={(e) => setValues({ ...values, password: e.target.value })} 
                            placeholder='Enter Password' 
                            className='form-control rounded-0' 
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
