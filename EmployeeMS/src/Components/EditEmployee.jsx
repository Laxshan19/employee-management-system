import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'; 


const EditEmployee = () => {
  const {id}=useParams();
  // Validate form inputs
    const [errors, setErrors] = useState({});
    const [category,setCategory]=useState([]);
    const [employee,setEmployee]=useState(
      {
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
      }
    );
    
    const validateForm = () => {
      let formErrors = {};
      
      if (!employee.name.trim()) formErrors.name = "Name is required";
      if (!employee.email.trim()) {
        formErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
        formErrors.email = "Invalid email format";
      }
     
      if (!employee.salary.trim()) {
        formErrors.salary = "Salary is required";
      } else if (isNaN(employee.salary) || employee.salary <= 0) {
        formErrors.salary = "Salary must be a positive number";
      }
      if (!employee.address.trim()) formErrors.address = "Address is required";
      if (!employee.category_id) formErrors.category_id = "Category is required";
     
  
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    };
 

  useEffect(()=>{
    axios.get(`http://localhost:3000/auth/get_category`)
    .then((result)=>{
      if(result.data.success){
        console.log(result.data.result);
        setCategory(result.data.result);
      }
    },)
  },[])

  useEffect(()=>{
    axios.get(`http://localhost:3000/auth/get_employee/${id}`)
    .then((result)=>{
      console.log(result.data[0])
      setEmployee(result.data[0]);
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

    
   const handleSubmit=(e)=>{
    e.preventDefault()
    if(!validateForm()) return;
    axios.put(`http://localhost:3000/auth/edit_employee/${id}`,employee)
    .then((result)=>{
      setEmployee({
        ...employee,
        name: result.data.result.name,
        email: result.data.result.email,
        address: result.data.result.address,
        salary: result.data.result.salary,
        category_id: result.data.result.category_id,
    })
        alert("Updated")
    })
    .catch((error)=>{
      alert(error)
    })
   }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Edit Employee</h3>
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter Name"
            value={employee.name}
            onChange={(e)=>{
              setEmployee({...employee,name:e.target.value})
            }}
          />
           {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control rounded-0"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            value={employee.email}
            onChange={(e)=>{
              setEmployee({...employee,email:e.target.value})
            }}
          />
           {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className='col-12'>
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            value={employee.salary}
            onChange={(e)=>{
              setEmployee({...employee,salary:e.target.value})
            }}
          />
           {errors.salary && <small className="text-danger">{errors.salary}</small>}
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            value={employee.address}
            onChange={(e)=>{
              setEmployee({...employee,address:e.target.value})
            }}
          />
           {errors.address && <small className="text-danger">{errors.address}</small>}
        </div>
        <div className="col-12">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select name="category" id="category" className="form-select" onChange={(e)=>{
              setEmployee({...employee,category_id:e.target.value})
            }} >
           {/* Show the selected category name instead of category_id */}
          <option value="" selected>
            {category.find((c) => c.id === employee.category_id)?.name || "Select Category"}
          </option>
           {category.map((c)=>{
            return <option key={c.id} value={c.id}>{c.name}</option>
           })
             }
          </select>
        </div>
        
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Edit Employee
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditEmployee
