import { ChatGroq } from "@langchain/groq"

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
})

export const getModels = async(agent) => {
    switch(agent){
        case "search":
            return groq
        case "pdf":
            return groq
        case "ppt":
            return groq
        case "chat":
            return groq
        default:
            return groq
    }
}
