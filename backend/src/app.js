import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/authroutes.js";
import userroutes from "./routes/userroutes.js";
import careerRoutes from "./routes/careerroutes.js"


const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/user", userroutes);
app.use("/api/career", careerRoutes);


app.get('/',(req,res)=>{
    res.send("Hello");
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});