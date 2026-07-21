import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser"
import protect from "./middleware/auth.middleware.js"
import {currentuser} from "./controller/auth.controller.js"
import {proxyheader} from "./utils/proxyheader.js"
import morgan from "morgan"

dotenv.config()

const SERVER_PORT = process.env.PORT
const app = express()
app.use(morgan('dev'))

app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',proxy(process.env.AUTH_URL))
app.use('/api/chat',protect,proxyheader(process.env.CHAT_URL))
app.use('/api/agent',protect,proxy(process.env.AGENT_URL))
app.get('/api/currentuser',protect,currentuser)
app.get('/',(req,res)=>{
    res.json({message:'hellllo g gateway'})
})
app.listen((SERVER_PORT),()=>{
console.log("hello from gateway");
})