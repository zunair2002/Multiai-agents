import redis from "../../../common/redis/redis.js";
import { getAllMessages } from "../utils/getallmessages.js";


export const getMemory = async(conversationId) => {
    try {
        const key = `memory:${conversationId}`;
        const cached = await redis.get(key);
        if(cached){
            return JSON.parse(cached);
        }
        const messages = await getAllMessages(conversationId);
        await redis.set(key, JSON.stringify(messages), "EX", 24*60*60);
        return messages;

    } catch (error) {
        console.error("Error fetching conversation history:", error);
        return [];
    }
}

export const addMessage = async(conversationId, role, content) => {
    try {
        const key = `memory:${conversationId}`;
        const rawmessages = await redis.get(key);
        // Ensure messages is always an array
        let messages = [];
        if (rawmessages) {
            const parsed = JSON.parse(rawmessages);
            if (Array.isArray(parsed)) {
                messages = parsed;
            }
        }
        messages.push({role, content});
        if(messages.length > 20){
            messages.shift();
        }
        await redis.set(key, JSON.stringify(messages));
        return messages;
    } catch (error) {
        console.error("Error adding message to memory:", error);
        return [];
    }
}