import { getModels } from "./config/llmmodels.js";

export const chatagent = async(state)=>{
    const LLM = await getModels("chat")
    const systemprompt = `
    You are a helpful assistant.
    user query: ${state.prompt}
    `
    const response = await LLM.invoke([
        {
            role:"system",
            content:systemprompt
        },
        {
            role:"human",
            content:state.prompt
        }
    ])
    return {
        ...state,
        response:response.content
    }
    
}