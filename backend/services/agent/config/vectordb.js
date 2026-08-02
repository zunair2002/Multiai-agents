import { QdrantVectorStore } from "@langchain/qdrant";
import dotenv from "dotenv";
import { embeddings } from "./embeddings.js";

dotenv.config();
console.log('vector file may')
console.log(process.env.QDRANT_URL);
console.log(process.env.QDRANT_API_KEY);

export const vectorestore = async (docs, collectionName) => {
  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: process.env.QDRANT_URL,
    collectionName,
  });
  return vectorStore;
};
