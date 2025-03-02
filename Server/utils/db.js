import mysql from 'mysql2';

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"employee_ms",
    port:"3307"
})

con.connect((err)=>{
    if(err){
        console.log("connection error"+err);
    }else{
        console.log("connected!");
    }
})

export default con; // Export the connection