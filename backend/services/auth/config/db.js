import mongoose from "mongoose"
import dotenv from "dotenv"
import dns from "dns"

dns.setServers(['1.1.1.1','8.8.8.8'])

dotenv.config()
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log('DB connected!')
    } catch (error) {
    console.error("DB connection error:", error.message);
}
}
export default connectDB;