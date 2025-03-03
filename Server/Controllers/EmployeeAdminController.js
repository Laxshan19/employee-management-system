import con from "../utils/db.js";
import bcrypt from 'bcrypt'


export const addEmployee=(req,res)=>{
    
    const sql='INSERT INTO employee(name,email,password,address,salary,image,category_id) VALUES (?) ';
    bcrypt.hash(req.body.password,10,(error,hash)=>{
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
                        res.status(500).json({status:false,Error:"server error"})
                    }else{
                        res.status(201).json({status:true})
                    }
                })
    })
    

 }
 