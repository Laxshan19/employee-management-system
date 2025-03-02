import express from "express";
import { adminlogin } from "../Controllers/AdminController.js";

const router=express.Router();

router.post('/adminlogin',adminlogin)

export {router as adminRouter}