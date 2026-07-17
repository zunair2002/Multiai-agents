import { Annotation } from "@langchain/langgraph";

export const agentstate = Annotation.Root({
 prompt:Annotation(),
 response:Annotation(),
 agentkey:Annotation(),
})