import axios from "axios";
import { graph } from "../graph/node.js";
import { addMessage } from "../config/memory.js";



export const agentcontroller = async (req, res) => { 
    const { prompt, conversationId } = req.body;
    await axios.post(`${process.env.CHAT_URL}/savemessage`, { conversationId, role: "user", content: prompt });
    const result = await graph.invoke({
            conversationId,
            prompt,
        });

    const agentResponse = result.response; 
    await addMessage(conversationId, "user", prompt);
    await addMessage(conversationId, "assistant", agentResponse);
    await axios.post(`${process.env.CHAT_URL}/savemessage`, { conversationId, role: "assistant", content: agentResponse });

    return res.status(200).json({ response: agentResponse });
};