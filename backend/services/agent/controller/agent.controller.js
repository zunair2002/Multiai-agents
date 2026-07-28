import axios from "axios";
import { graph } from "../graph/node.js";

export const agentcontroller = async (req, res) => {
    const { prompt, conversationId, agentkey } = req.body;

    // Save the user's message to the main database (this is correct)
    await axios.post(`${process.env.CHAT_URL}/savemessage`, { conversationId, role: "user", content: prompt });

    // Invoke the graph. The graph will now handle agent-specific memory.
    const result = await graph.invoke({
        conversationId,
        prompt,
        agentkey
    });

    const agentResponse = result.response;
    await axios.post(`${process.env.CHAT_URL}/savemessage`, { conversationId, role: "assistant", content: agentResponse });

    return res.status(200).json({
        response: agentResponse,
        searchresults: result.searchresults,
    });
};