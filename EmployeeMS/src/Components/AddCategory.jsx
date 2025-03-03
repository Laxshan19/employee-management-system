import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


const AddCategory = () => {
    const [category,setCategory]=useState();

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
      e.preventDefault(); // Fix: Corrected typo
  
      axios
        .post("http://localhost:3000/auth/add_category", { name: category }) // Fix: Send as an object
        .then((result) => {
          console.log(result);
          if (result.data.success) {
            navigate("/dashboard/add_category");
          } else {
            console.log(result.data.error);
          }
        })
        .catch((error) => console.log(error));
    };
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="category"><strong>Category:</strong></label>
                <input type="text" onChange={(e)=>setCategory(e.target.value)} name='category' placeholder='Enter Category'  className='form-control rounded-0'/>
            </div>
            <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Add Category</button>
        </form>
    </div>
</div>
  )
}

export default AddCategory
