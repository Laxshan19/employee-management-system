import { query } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";


export const adminLogin=(req,res)=>{
   try{
    //1.receving the input fields
      const {email,password}=req.body;
    //2.validate the UserInput
      if(!email||!password){
        return res.json({loginStatus:false,Error:"Enter username or password!"});
      }
    //3.check if user exitting
    const sql="SELECT * FROM admin WHERE email=?";
     con.query(sql,[email],(error,result)=>{
        if(error){
            return res.json({loginStatus:false,Error:"database error",error})
        }
        if(result.length===0){
           return res.json({loginStatus:false,Error:"username doesn't exit"});
        }
     //4.check password validite
       if(password!==result[0].password){
        return res.json({loginStatus:false,Error:"password doesn't match"});
       }
       //05.generate the jwt token
       else{
        const id=result.id;
       const token =jwt.sign(
        {
            id:id,role:"admin",email:email
        },
        "jwt_secret_key",
        {expiresIn:"1d"}
       );
       //06.store the token in cookie
       res.cookie('token',token)
       return res.json({loginStatus:true});
       }
     })
   }catch(error){
    console.log("Error"+error);
     return res.status(500).send("Internal Server Error!");
   } 
}


export const addCategory = (req, res) => {
  // 1. Extract data properly
  const { name } = req.body;

  // 2. Validate input (Fix: return properly)
  if (!name || name.trim() === "") {
    return res.status(400).json({ success: false, error: "Category name is required" });
  }

  // 3. Check if category exists
  const sql1 = "SELECT * FROM categories WHERE name=?";
  con.query(sql1, [name], (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, error: "Database error", details: error });
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, error: "This category already exists!" });
    }

    // 4. Insert into database
    const sql2 = "INSERT INTO categories (name) VALUES (?)";
    con.query(sql2, [name], (error, result) => {
      if (error) {
        return res.status(500).json({ success: false, error: "Database error" });
      } else {
        return res.status(201).json({ success: true, message: "Category added successfully!", data: result });
      }
    });
  });
};



export const getCategories = (req, res) => {
  const sql = "SELECT * FROM categories";

  con.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ success: false, error: "Server error: " + error });
    }
    return res.status(200).json({ success: true,  result });
  });
};


//admin count
export const getAdminCount=(req,res)=>{
  const sql='SELECT COUNT(id) AS count FROM admin';
  con.query(sql,(error,result)=>{
    if(error) return res.status(500).json({error:"Error in running"});
    return res.json({adimcount:result[0].count});
  })
}

//admin count
export const getEmployeeCount=(req,res)=>{
  const sql='SELECT COUNT(id) AS count FROM employee';
  con.query(sql,(error,result)=>{
    if(error) return res.status(500).json({error:"Error in running"});
    return res.status(200).json({employeecount:result[0].count});
  })
}

//salary sum
export const getSumSalary=(req,res)=>{

  const sql='SELECT SUM(salary) AS sum FROM employee';
  con.query(sql,(error,result)=>{
    if(error) return res.status(500).json({error:"Error in running"});
   // console.log(result);
    return res.status(200).json({sumsalary:result[0].sum})
  })
}

export const getAllAdmin=(req,res)=>{
  const sql='SELECT * FROM admin';
  con.query(sql,(error,result)=>{
    if(error) res.status(200).json({error:"Error is running"});
    console.log(result);
    res.status(200).json(result);
  })
}