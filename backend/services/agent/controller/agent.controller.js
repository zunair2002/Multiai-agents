import axios from "axios";
import { graph } from "../graph/node.js";

export const agentcontroller = async (req, res) => { 
  console.log(req.body);
  const { prompt, conversationId } = req.body;
  console.log("BODY:", req.body);
  console.log(prompt, conversationId);

    try {
        await axios.post(`${process.env.CHAT_URL}/savemessage`, {
            conversationId,
            role: "user",
            content: prompt
        });

        const result = await graph.invoke({
            conversationId,
            prompt,
        });

        const agentResponse = result.response; 
        await axios.post(`${process.env.CHAT_URL}/savemessage`, {
            conversationId,
            role: "assistant",
            content: agentResponse
        });
        return res.status(200).json({
            response: agentResponse
        });

    } catch (error) {
        console.error("Agent controller error:", error); 
        return res.status(500).json({
            error: error.message
        });
    }
};