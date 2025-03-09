import React from 'react'

const EditEmployee = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Edit Employee</h3>
      <form className="row g-1">
        <div className="col-12">
          <label for="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter Name"
           
          />
        </div>
        <div className="col-12">
          <label for="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control rounded-0"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
           
          />
        </div>
        <div className='col-12'>
          <label for="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
           
          />
        </div>
        <div className="col-12">
          <label for="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            
          />
        </div>
        <div className="col-12">
          <label for="category" className="form-label">
            Category
          </label>
          <select name="category" id="category" className="form-select">

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
