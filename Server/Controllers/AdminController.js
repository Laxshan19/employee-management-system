import con from "../utils/db.js";
import jwt from "jsonwebtoken";


export const adminlogin=(req,res)=>{
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