import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'



const Dashboard = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  axios.get("http://localhost:3000/auth/adminlogout", { withCredentials: true }) // Ensure cookies are sent
    .then((result) => {
      console.log(result);
      navigate("/adminlogin"); // Redirect to login page
    })
    .catch((error) => {
      console.log(error);
    });
};
    return (
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
              </a>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li>
                  <Link to="/dashboard" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                </li>
                <li>
                  <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white">
                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Employees</span> </Link>
                </li>
                <li>
                  <Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-columns ms-2"></i> <span className="ms-1 d-none d-sm-inline">Category</span> </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="nav-link px-0 align-middle text-white">
                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
                </li>
                <li>
                      <button className="btn btn-link nav-link text-white px-0 align-middle" onClick={handleLogout}>
                        <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
                      </button>
                    </li>
              </ul>
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className='p-2 d-flex justify-content-center shadow'>
              <h4>Employee Management System</h4>						
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
