import axios from "axios";
import {node} from "../graph/node.js"
import { response } from "express";
export const agentcontroller = async(state)=>{
    try {
        const {prompt,conversationId} = req.body
        const result = await axios.post(`${process.env.CHAT_URL}/savemessage`,{
         conversationId,role:"user",content:prompt
        })
        const result = await node.invoke({
            conversationId,
            prompt,
        })
        const result = result.response
        return res.status(200).json({
            response:result
        })


    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}