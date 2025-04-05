import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";
import generateToken from "../utils/generatetoken.js";

const prisma = new PrismaClient();

export const registerUser = async (req,res)=>{
    try {
        const {name, email, password} =req.body;

        const userExist = await prisma.user.findUnique({
            where:{email},
        });

        if (userExist){
            return res.status(400).json({message: "User already Exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data :{name,email, password:hashedPassword},
        });

        const token =generateToken(user.id);

        res.status(201).json({ id: user.id, name: user.name, email: user.email, token });
    } catch (error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user = await prisma.user.findUnique({
            where:{email},
        });

        if (!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const isMatch= await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = generateToken(user.id);

        res.json({ id: user.id, name: user.name, email: user.email, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};