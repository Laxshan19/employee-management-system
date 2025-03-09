import con from "../utils/db.js";
import bcrypt from 'bcrypt';
import { error } from "console";
import multer from "multer";
import path from "path";


//image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({
  storage: storage
})
// end imag eupload 

//Add Validation Function
const addValidateEmployeeData = (employeeData) => {
  const errors = {};

  // Name Validation
  if (!employeeData.name || employeeData.name.trim() === "") {
    errors.name = "Name is required.";
  }

  // Email Validation
  if (!employeeData.email || employeeData.email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(employeeData.email)) {
    errors.email = "Invalid email format.";
  }

  // Password Validation
  if (!employeeData.password || employeeData.password.trim() === "") {
    errors.password = "Password is required.";
  } else if (employeeData.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  // Salary Validation
  if (!employeeData.salary || employeeData.salary.trim() === "") {
    errors.salary = "Salary is required.";
  } else if (isNaN(employeeData.salary) || parseFloat(employeeData.salary) <= 0) {
    errors.salary = "Salary must be a positive number.";
  }

  // Address Validation
  if (!employeeData.address || employeeData.address.trim() === "") {
    errors.address = "Address is required.";
  }

  // Category Validation
  if (!employeeData.category_id) {
    errors.category_id = "Category is required.";
  }
  return errors;
};

//Add Validation Function
const editValidateEmployeeData = (employeeData) => {
  const errors = {};

  // Name Validation
  if (!employeeData.name || employeeData.name.trim() === "") {
    errors.name = "Name is required.";
  }

  // Email Validation
  if (!employeeData.email || employeeData.email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(employeeData.email)) {
    errors.email = "Invalid email format.";
  }

  // Salary Validation
  if (!employeeData.salary || employeeData.salary.trim() === "") {
    errors.salary = "Salary is required.";
  } else if (isNaN(employeeData.salary) || parseFloat(employeeData.salary) <= 0) {
    errors.salary = "Salary must be a positive number.";
  }

  // Address Validation
  if (!employeeData.address || employeeData.address.trim() === "") {
    errors.address = "Address is required.";
  }

  // Category Validation
  if (!employeeData.category_id) {
    errors.category_id = "Category is required.";
  }
  return errors;
};



export const addEmployee=(req,res)=>{

  const errors=addValidateEmployeeData(req.body);
    // Check if there are validation errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ status: false, errors });
  }

    const sql='INSERT INTO employee(name,email,password,address,salary,image,category_id) VALUES (?) ';
    bcrypt.hash(req.body.password.toString(),10,(error,hash)=>{
        if(error) return res.json({status:false,Error:"Query Error"})
        const values=[
                req.body.name,
                req.body.email,
                hash,
                req.body.address,
                req.body.salary,
                req.file.filename,
                req.body.category_id
                 ]

                 con.query(sql,[values],(error,result)=>{
                    if(error){
                        res.status(500).json({status:false,Error:"Query error"})
                    }else{
                        res.status(201).json({status:true})
                    }
                })
    })
 }

 export const getEmployee = (req, res) => {
    const sql = "SELECT * FROM employee";
  
    con.query(sql, (error, result) => {
      if (error) {
        return res.status(500).json({ success: false, error: "Server error: " + error });
      }
      return res.status(200).json({ success: true,  result });
    });
  };


export const getEmployeeById=(req,res)=>{
  const id=req.params.id;
  const sql="SELECT * FROM employee WHERE id=?";
  con.query(sql,[id],(err,result)=>{
    if(err){
      res.status(500).json({message:"server error"+err})
    }else{
      return res.status(200).json(result);
    }
  })
}

export const editEmployee=(req,res)=>{
  const errors=editValidateEmployeeData(req.body);
    // Check if there are validation errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ status: false, errors });
  }

  const id=req.params.id;
  // Check if a new image is uploaded
  const imageFilename = req.file ? req.file.filename : req.body.existingImage;

  const sql="UPDATE employee SET name=?,email=?,salary=?,address=?,category_id=?,image=? WHERE id=?";
  const values=[
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.salary,
     imageFilename, // Use new file if uploaded, otherwise keep the old one
    req.body.category_id,
    id,
  ]
  con.query(sql,values,(err,result)=>{
    if(err) res.json({message:"server Error"+err})
    return res.json({success:"updated successfully!"});
})
}


export const deleteEmployee=(req,res)=>{
  const id=req.params.id;
  const sql="DELETE FROM employee WHERE id=(?)";
  con.query(sql,[id],(error,result)=>{
    if(error) return res.status(500).json({status:false,message:"query error"+error})
    if(result.affectedRows===0) return res.status(404).json({status:false,message:"Employee not found"})
    return res.status(200).json({status:true,message:"deleted sucessfully!"})
  })
}