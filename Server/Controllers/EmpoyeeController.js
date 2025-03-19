import { json } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const employeeLogin=(req,res)=>{
  try{
      //receving the use credentials
      const {email,password}=req.body;
      //validate the input field
      if(!email||!password){
        return res.status(400).json({loginstatus:false,error:"Enter username or password!"})
      }
      //check if the user exits
      const sql="SELECT * FROM employee WHERE email=?";
      con.query(sql,[email],(error,result)=>{
        if(error){
            return res.status(500).json({loginstatus:false,error:"quary error!"})
        }
        if(result.length===0){
        return res.status(500).json({loginstatus:false,error:"user does't exits!"});
        }
        bcrypt.compare(password,result[0].password,(error,isMatch)=>{
        if(error){
          return res.status(500).json({ loginstatus: false, error: "Error comparing passwords!" });
        }
        if(!isMatch){
          return res.status(401).json({ loginstatus: false, error: "Wrong password!" });
        }else{
              //generate the jwt token
        const id=result[0].id;
        const token=jwt.sign(
          {
              id:id,role:"employee",email:email
          },
          "jwt_secrete_key",
          {
              expiresIn:"1d"
          }
        )   
        //store in the cookies
        res.cookie('employee',token);
        return res.status(200).json({loginstatus:true});
        }
       
      })});
  }catch(error){
    console.log("Error"+error);
     return res.status(500).send("Internal Server Error!");
   } 
}

/*
//asyc await method
export const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ loginstatus: false, error: "Enter username or password!" });
    }

    // Query database using Promise
    const user = await new Promise((resolve, reject) => {
      con.query("SELECT * FROM employee WHERE email = ?", [email], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });

    if (user.length === 0) {
      return res.status(404).json({ loginstatus: false, error: "User doesn't exist!" });
    }

    // Check password with bcrypt.compare
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ loginstatus: false, error: "Wrong password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user[0].id, role: "employee", email: email }, "jwt_secrete_key", {
      expiresIn: "1d",
    });

    res.cookie("employee", token, { httpOnly: true, secure: true });
    return res.status(200).json({ loginstatus: true });

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).send("Internal Server Error!");
  }
};

*/