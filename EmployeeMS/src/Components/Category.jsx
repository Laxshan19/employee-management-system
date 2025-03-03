import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
    const [category, setCategory] = useState([]); // ✅ Ensure category is initialized as an array

    useEffect(() => {
        axios.get('http://localhost:3000/auth/get_category')
            .then((result) => {
                console.log("API Response:", result); // Debugging
    
                if (result.data && result.data.data) { // ✅ Access "data" instead of "result"
                    setCategory(result.data.data);  
                } else {
                    setCategory([]); // ✅ If API response is incorrect, set an empty array
                    console.error("Unexpected API response:", result.data);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setCategory([]); // ✅ Handle API errors properly
            });
    }, []);
    

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.length > 0 ? (
                            category.map((c, index) => (
                                <tr key={index}>  
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No categories found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
