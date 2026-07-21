import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import router from "./routes/auth.route.js"
import cookieParser from "cookie-parser";


dotenv.config()


const SERVER_PORT = process.env.PORT
const app = express()
app.use(express.json());
app.use(cookieParser()); 


app.get('/',(req,res)=>{
    res.json({message:'hellllo g auth'})
})
app.use('/',router);

app.listen((SERVER_PORT),()=>{
console.log("hello from auth");
connectDB()
})