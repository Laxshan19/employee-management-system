import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'
import {useNavigate} from 'react-router-dom';


const AddEmployee = () => {

  const navigate = useNavigate(); 

  //TO LOAD THE CATEGORY IN SELECT OPTION FIELD
  const [category, setCategory] = useState([]); 
  useEffect(() => {
      axios.get('http://localhost:3000/auth/get_category')
          .then((result) => {
              console.log("API Response:", result.data); // Debugging
              if (result.data.success) { 
                  setCategory(result.data.result);  
              } else {
                  setCategory([]); // if API response is incorrect, set an empty array
                  console.error("Unexpected API response:", result.data);
              }
          })
          .catch(error => {
              console.error("Error fetching categories:", error);
              setCategory([]); //  Handle API errors properly
          });
  }, []);       


  // Validate form inputs
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    let formErrors = {};
    
    if (!employee.name.trim()) formErrors.name = "Name is required";
    if (!employee.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!employee.password.trim()) {
      formErrors.password = "Password is required";
    } else if (employee.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }
    if (!employee.salary.trim()) {
      formErrors.salary = "Salary is required";
    } else if (isNaN(employee.salary) || employee.salary <= 0) {
      formErrors.salary = "Salary must be a positive number";
    }
    if (!employee.address.trim()) formErrors.address = "Address is required";
    if (!employee.category_id) formErrors.category_id = "Category is required";
    if (!employee.image) formErrors.image = "Please select an image";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

        //ADD DATABASE INTO DATABASE
        const [employee,setEmployee]=useState({
          name: "",
          email: "",
          password: "",
          salary: "",
          address: "",
          category_id: "",
          image: null,
        })

        const fileInputRef = useRef(null); // Create a ref for the file input

        const handleSubmit= async (e)=>{
          e.preventDefault(); 

          if(!validateForm()) return;
          
          const formData = new FormData();
          formData.append('name', employee.name);
          formData.append('email', employee.email);
          formData.append('password', employee.password);
          formData.append('address', employee.address);
          formData.append('salary', employee.salary);
          formData.append('image', employee.image);
          formData.append('category_id', employee.category_id);

          axios.post("http://localhost:3000/auth/addemployee",formData)
          .then(
              (result)=>{
                 if(result.data.status){
                   //navigate('/dashboard/add_employee')
                   alert("Employee added successfully!");
                    // Reset form fields
                      setEmployee({
                        name: "",
                        email: "",
                        password: "",
                        salary: "",
                        address: "",
                        category_id: "",
                        image: null,
                      });

                        // Clear the file input
                          if (fileInputRef.current) {
                            fileInputRef.current.value = null;
                          }
                      // Clear errors
                      setErrors({});
                 }else{
                  console.log(result.data.Error)
                 }
              }
          ).catch(
            err => console.log(err)
          )
        }
  


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <div className="p-3 rounded w-50 border">
            <h3 className="text-center">Add Employee</h3>
            <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                      <label htmlFor="inputName" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="inputName"
                        placeholder="Enter Name"
                        value={employee.name}  // Bind input to the employee state
                        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                      />
                      {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="inputEmail4" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control rounded-0"
                        id="inputEmail4"
                        placeholder="Enter Email"
                        autoComplete="off"
                        value={employee.email}  // Bind input to the employee state
                        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                      />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="inputPassword4" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control rounded-0"
                        id="inputPassword4"
                        placeholder="Enter Password"
                        value={employee.password}  // Bind input to the employee state
                        onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                      />
                      {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="inputSalary" className="form-label">Salary</label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="inputSalary"
                        placeholder="Enter Salary"
                        autoComplete="off"
                        value={employee.salary}  // Bind input to the employee state
                        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                      />
                      {errors.salary && <small className="text-danger">{errors.salary}</small>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="inputAddress" className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="inputAddress"
                        placeholder="1234 Main St"
                        autoComplete="off"
                        value={employee.address}  // Bind input to the employee state
                        onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                      />
                      {errors.address && <small className="text-danger">{errors.address}</small>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="category" className="form-label">Category</label>
                      <select
                        name="category"
                        id="category"
                        className="form-select"
                        value={employee.category_id}  // Bind input to the employee state
                        onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
                      >
                        <option value="" disabled selected>Choose a category</option>
                        {category.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      {errors.category_id && <small className="text-danger">{errors.category_id}</small>}
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="inputGroupFile01" className="form-label">Select Image</label>
                      <input
                        type="file"
                        className="form-control rounded-0"
                        id="inputGroupFile01"
                        name="image"
                        onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                        ref={fileInputRef} // Set the ref for the file input
                      />
                      {errors.image && <small className="text-danger">{errors.image}</small>}
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100">
                        Add Employee
                      </button>
                    </div>
                  </form>
          </div>
        </div>
      );
}

export default AddEmployee  