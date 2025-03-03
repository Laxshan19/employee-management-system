import express from "express";
import { adminLogin,addCategory,getCategories } from "../Controllers/AdminController.js";

const router=express.Router();

router.post('/adminlogin',adminLogin)
router.post('/add_category',addCategory)
router.get('/get_category',getCategories)


export {router as adminRouter}