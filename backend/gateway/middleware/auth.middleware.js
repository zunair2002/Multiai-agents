import redis from "../../common/redis/redis.js";

const protect = async (req,res,next)=>{
    try {
        const sessionID = req.cookies.session;
        if(!sessionID){
            return res.status(400).json({message:'Unauthorized'});
        }
        const usersession = await redis.get(`session:${sessionID}`);
        if(!usersession){
            return res.status(400).json({message:'Session expired'});
        }
        req.user = JSON.parse(usersession);
        next();
    } catch (error) {
        console.error("Error during auth middleware:", error)
        return res.status(400).json({message:'Auth failed'});
    }        
    }
    export default protect;