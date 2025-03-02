import express from "express";
import db from "./utils/db.js";
import cors from 'cors';
import { AdminRouter } from "./Routes/AdminRoute.js";

const app=express();
app.use(cors());
app.use(express.json);
app.use('/auth',AdminRouter);


app.listen(3000,()=>{
    console.log("Server is running at: http://localhost:3000/");
})

