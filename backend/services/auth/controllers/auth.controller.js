import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import crypto from "crypto";


export const login = async (req,res)=>{
try {
    // abhi sessionID ko cookies may rkh rhy
    const {token} = req.body;
    const decodetoken = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({firebaseID:decodetoken.uid});
    if(!user){
        user = await User.create({
            firebaseID:decodetoken.uid,
            name:decodetoken.name,
            email:decodetoken.email,
            avatar:decodetoken.picture,
        });
    }
    const sessionID = crypto.randomUUID();
    res.cookie("sessionID",sessionID,{httpOnly:true,secure:false,sameSite:"Strict",maxAge:1000 * 60 * 60 * 24 * 2}); 
    return res.status(200).json({message:"Login success",user});
} catch (error) {
    console.error("Error during login:", error)
    return res.status(400).json({message:'Login failed'});
   }
}