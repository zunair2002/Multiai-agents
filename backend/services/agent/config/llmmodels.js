import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
})

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0,
    maxRetries: 2,
})

export const getModels = async(agent) => {
    switch(agent){
        case "search":
            return groq
        case "pdf":
            return gemini
        case "chat":
            return groq
        default:
            return groq
    }
}
