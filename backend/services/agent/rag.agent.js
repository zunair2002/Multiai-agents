import fs from "fs";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getModels } from "./config/llmmodels.js";
import { vectorestore } from "./config/vectordb.js";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

export const ragagent = async (state) => {
  try {
    const buffer = fs.readFileSync(state.file.path);
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    await parser.destroy();
    const text = data.text;

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await splitter.createDocuments([text]);
    const collectionName = `pdf_${Date.now()}`;
    const store = await vectorestore(docs, collectionName);

    const releventresults = await store.similaritySearch(state.prompt, 5);
    const context = releventresults.map((item) => item.pageContent).join("\n");

    const llm = await getModels("rag");
    const messages = [
      new SystemMessage(
        `
            You are a PDF RAG Agent specialized in analyzing uploaded PDF documents.

Your responsibilities are:
- Retrieve relevant information from uploaded PDFs using RAG.
- Answer questions strictly based on the document content.
- Summarize, explain, extract key points, generate notes, and provide structured responses.
- Maintain context across follow-up questions.

Rules:
- Always use the uploaded PDF as the primary source.
- Never hallucinate or fabricate information.
- If the answer is not present in the document, clearly state that it is not available.
- Use external knowledge only when the user explicitly requests it.
            `,
      ),
      new HumanMessage(`Context: ${context} Question: ${state.prompt}`),
    ];
    const response = await llm.invoke(messages);

    return {
      ...state,
      response: response.content,
    };
  } catch (error) {
    console.log(error);
    return {
      ...state,
      response: "Sorry, I was unable to process the PDF. Please try again.",
    };
  }
};
