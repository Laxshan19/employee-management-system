import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import {employeeRouter} from "./Routes/EmployeeRoute.js"

const app = express();

app.use('/images', express.static('Public/Images'));

app.use(cors({
    origin: "http://localhost:5173",  // React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],  
    credentials: true,  // Allow cookies, sessions, JWT, etc.
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use('/auth', adminRouter);
app.use('/employee',employeeRouter);

app.listen(3000, () => {
    console.log("Server is running at: http://localhost:3000/");
});
