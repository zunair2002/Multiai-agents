import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config()


const SERVER_PORT = process.env.PORT
const app = express()
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message:'hellllo g agent'})
})

app.listen((SERVER_PORT),()=>{
console.log("hello from agent");
connectDB()
})