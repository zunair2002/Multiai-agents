import { getModels } from "../config/llmmodels.js";

export const router = async (state) => {
  // If user selected a tool manually, ensure it's lowercase and pass the state along.
  if (state.agentkey && state.agentkey.toLowerCase() !== "auto") {
    state.agentkey = state.agentkey.toLowerCase();
    return state; // Return the mutated original state
  }

  // 'Auto' mode: Let the LLM decide the agent.
  const LLM = await getModels("router");
  const prompt = `
    You are a routing AI. Your ONLY task is to select the single best agent to handle the user's request.

    The user's prompt is: "${state.prompt}"
    
    The available agents are:
    - 'search': For requests about current events, news, or live information.
    - 'pdf': For requests to summarize, analyze, or answer questions about an uploaded PDF.
    - 'chat': For general conversation, coding, math, and all other requests.

    Based on the user's prompt, which agent should be used?
    Respond with a SINGLE word from the list: search, pdf, or chat.
  `;

  const response = await LLM.invoke(prompt);
  const llmOutput = response.content.trim().toLowerCase();
  
  let nextAgent = "chat"; // Default to 'chat' if no specific keyword is found
  if (llmOutput.includes("pdf")) {
    nextAgent = "pdf";
  } else if (llmOutput.includes("search")) {
    nextAgent = "search";
  }

  console.log(`Router Decision: Selected agent is '${nextAgent}' from LLM output: '${llmOutput}'`);

  // *** THE FIX: Mutate the original state object directly ***
  state.agentkey = nextAgent; 
  return state; // Return the same state object that was passed in
};