import con from "../utils/db.js";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";

export const addEmployee=(req,res)=>{
    
    const sql='INSERT INTO employee(name,email,password,address,salary,image,category_id) VALUES (?) ';
    bcrypt.hash(req.body.password.toString(),10,(error,hash)=>{
        if(error) return res.json({status:false,Error:"Query Error"})
        const values=[
                req.body.name,
                req.body.email,
                hash,
                req.body.address,
                req.body.salary,
                req.body.image,
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
 