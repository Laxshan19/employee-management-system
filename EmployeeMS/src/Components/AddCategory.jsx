import React from 'react'

const AddCategory = () => {
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Add Category</h2>
        <form >
            <div className='mb-3'>
                <label htmlFor="category"><strong>Category:</strong></label>
                <input type="text" name='category' placeholder='Enter Category'  className='form-control rounded-0'/>
            </div>
            <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
        </form>
    </div>
</div>
  )
}

export default AddCategory
