import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()

const SERVER_PORT = process.env.PORT
const app = express()
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}));
app.use(cookieParser());
app.use(express.json());

app.use('/auth',proxy(process.env.AUTH_URL))
app.get('/',(req,res)=>{
    res.json({message:'hellllo g gateway'})
})
app.listen((SERVER_PORT),()=>{
console.log("hello from gateway");
})