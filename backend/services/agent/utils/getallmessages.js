import axios from "axios";

export const getAllMessages = async(conversationId) => {
    try {
        const {data} = await axios.get(`${process.env.CHAT_URL}/getmessage/${conversationId}`);
        return data;
    } catch (error) {
        console.error("Error fetching conversation history:", error);
        return [];
    }
}