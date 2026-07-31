import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import agentrouter from "./routes/agent.route.js"
import path from "path";
import { fileURLToPath } from "url";



dotenv.config()


const SERVER_PORT = process.env.PORT
const app = express()
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/',(req,res)=>{
    res.json({message:'hellllo g agent'})
})

app.use("/",agentrouter)
app.listen((SERVER_PORT),()=>{
console.log("hello from agent");
connectDB()
})