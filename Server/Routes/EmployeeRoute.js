import express from "express";
import { employeeLogin } from "../Controllers/EmpoyeeController.js";

const router=express.Router();

router.post('/employeelogin',employeeLogin);

export {router as employeeRouter}