import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",  // Allow requests from React app
    methods: ["GET", "POST", "PUT"],  
    credentials: true  // Allow cookies and authentication headers
}));

app.use(express.json());
app.use('/auth', adminRouter);

app.listen(3000, () => {
    console.log("Server is running at: http://localhost:3000/");
});
