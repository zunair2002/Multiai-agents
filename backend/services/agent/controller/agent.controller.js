import axios from "axios";
import { graph } from "../graph/node.js";

export const agentcontroller = async (req, res) => {
  try {
    const { prompt, conversationId, agentkey } = req.body;

    // Save the user's message
    await axios.post(`${process.env.CHAT_URL}/savemessage`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    const result = await graph.invoke({
      conversationId,
      prompt,
      agentkey,
      file: req.file,
    });
    const agentResponse = result.response;

    if (!(agentResponse && agentResponse.status === "completed")) {
      await axios.post(`${process.env.CHAT_URL}/savemessage`, {
        conversationId,
        role: "assistant",
        content: agentResponse,
      });
    }

    return res.status(200).json({
      response: agentResponse,
      searchresults: result.searchresults,
    });
  } catch (error) {
    console.error("agentcontroller error:", error);
    return res.status(500).json({ message: error.message });
  }
};