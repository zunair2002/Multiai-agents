import axios from "axios";
import {graph} from "../graph/node.js"
import { response } from "express";
export const agentcontroller = async(state)=>{
    try {
        const {prompt,conversationId} = req.body
        const resultdata = await axios.post(`${process.env.CHAT_URL}/savemessage`,{
         conversationId,role:"user",content:prompt
        })
        const result = await graph.invoke({
            conversationId,
            prompt,
        })
        const response = result.response
        return res.status(200).json({
            response:response
        })


    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}