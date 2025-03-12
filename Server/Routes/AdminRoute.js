import express from "express";
import { adminLogin,addCategory,getCategories } from "../Controllers/AdminController.js";
import { addEmployee,editEmployee,getEmployee, getEmployeeById, upload,deleteEmployee } from "../Controllers/EmployeeAdminController.js";

const router=express.Router();

router.post('/adminlogin',adminLogin)
router.post('/add_category',addCategory)
router.get('/get_category',getCategories)

router.post('/addemployee',upload.single('image'),addEmployee);
router.get('/get_employee',getEmployee);
router.get('/get_employee/:id',getEmployeeById);
router.put('/edit_employee/:id',editEmployee);
router.get('/delete_employee/:id',deleteEmployee);









export {router as adminRouter}