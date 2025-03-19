import { json } from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

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
       // return res.status(500).json(result);
       if(result[0].password!==password){
        return res.status(500).json({loginstatus:false,error:"wrong password!"})
       }

       else{
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

      })


      
      

      

  }catch(error){
    console.log("Error"+error);
     return res.status(500).send("Internal Server Error!");
   } 
}