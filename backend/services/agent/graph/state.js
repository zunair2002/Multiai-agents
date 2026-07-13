import { AnnotationState } from "@langchain/langgraph";

export const agentstate = AnnotationState.Root({
 prompt:Annotation(),
 response:Annotation(),
 agentkey:Annotation(),
})