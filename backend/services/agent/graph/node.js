import { StateGraph } from "@langchain/langgraph";
import { agentstate } from "./state.js";
import { router } from "./router.js";
import { searchagent } from "../search.agent.js";
import { pdfagent } from "../pdf.agent.js";
import { chatagent } from "../chat.agent.js";
import { pptagent } from "../pptagent.js";
import { imageagent } from "../image.agent.js";
import { ragagent } from "../rag.agent.js";


const workflow = new StateGraph(agentstate)

//sara workflow bhna liya

workflow.addNode("router",router)

workflow.addNode("search",searchagent)
workflow.addNode("pdf",pdfagent)
workflow.addNode("chat",chatagent)
workflow.addNode("ppt",pptagent)
workflow.addNode("image",imageagent)
workflow.addNode("rag",ragagent)

//ab workflow ko apis ,may connect krna

workflow.addEdge("__start__","router")
workflow.addConditionalEdges(
  "router",
  (state) => {
    console.log("State Agent:", state.agentkey);

    switch (state.agentkey) {
      case "search":
        return "search";
      case "pdf":
        return "pdf";
      case "ppt":
        return "ppt";
      case "chat":
        return "chat";
      case "image":
        return "image";
      case "rag":
        return "rag";
      default:
        return "chat";
    }
  },
  {
    search: "search",
    pdf: "pdf",
    ppt: "ppt",
    chat: "chat",
    image: "image",
    rag: "rag",
  }
);

workflow.addEdge("search","chat")
workflow.addEdge("pdf","__end__")
workflow.addEdge("ppt","__end__")
workflow.addEdge("chat","__end__")
workflow.addEdge("image","__end__")
workflow.addEdge("rag","__end__")

export const graph = workflow.compile();