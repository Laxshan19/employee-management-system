import express from "express";
import { adminLogin,addCategory,getCategories } from "../Controllers/AdminController.js";
import { addEmployee,getEmployee, upload } from "../Controllers/EmployeeAdminController.js";

const router=express.Router();

router.post('/adminlogin',adminLogin)
router.post('/add_category',addCategory)
router.get('/get_category',getCategories)

router.post('/addemployee',upload.single('image'),addEmployee);
router.get('/get_employee',getEmployee);





export {router as adminRouter}