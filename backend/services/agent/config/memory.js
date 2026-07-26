import redis from "../../../common/redis/redis.js";

// Get memory for a specific agent
export const getMemory = async (conversationId, agentKey) => {
    if (!conversationId || !agentKey) {
        console.error("getMemory error: conversationId or agentKey is missing.");
        return [];
    }
    const key = `memory:${conversationId}:${agentKey.toLowerCase()}`;
    try {
        const rawHistory = await redis.get(key);
        if (rawHistory) {
            const parsed = JSON.parse(rawHistory);
            return Array.isArray(parsed) ? parsed : [];
        }
        return []; // Return empty array if no history is cached for this agent
    } catch (error) {
        console.error(`Error fetching agent memory for key ${key}:`, error);
        return [];
    }
};

// Add a message to a specific agent's memory
export const addMessage = async (conversationId, agentKey, role, content) => {
    if (!conversationId || !agentKey) {
        console.error("addMessage error: conversationId or agentKey is missing.");
        return;
    }
    const key = `memory:${conversationId}:${agentKey.toLowerCase()}`;
    try {
        const currentHistory = await getMemory(conversationId, agentKey);
        currentHistory.push({ role, content });

        // Keep the history length to a reasonable size (e.g., last 20 messages)
        if (currentHistory.length > 20) {
            currentHistory.shift();
        }

        await redis.set(key, JSON.stringify(currentHistory), "EX", 24 * 60 * 60); // Cache for 24 hours
    } catch (error) {
        console.error(`Error adding message to agent memory for key ${key}:`, error);
    }
};