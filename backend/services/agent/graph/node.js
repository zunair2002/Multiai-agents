import { StateGraph } from "@langchain/langgraph";
import { agentstate } from "./state.js";
import { router } from "./router.js";
import { searchagent } from "../search.agent.js";
import { pdfagent } from "../pdf.agent.js";
import { chatagent } from "../chat.agent.js";


const workflow = new StateGraph(agentstate)

//sara workflow bhna liya

workflow.addNode("router",router)

workflow.addNode("search",searchagent)
workflow.addNode("pdf",pdfagent)
workflow.addNode("chat",chatagent)

//ab workflow ko apis ,may connect krna

workflow.addEdge("__start__","router")
workflow.addConditionalEdges("router",(state)=>{
    switch(state.agentkey){
        case "search":
            return "search"
        case "pdf":
            return "pdf"
        case "chat":
            return "chat"
        default:
            return "chat"
    }
},{
    search:"search",
    pdf:"pdf",
    chat:"chat",
})

workflow.addEdge("search","chat")
workflow.addEdge("pdf","__end__")
workflow.addEdge("chat","__end__")  

export const graph = workflow.compile();