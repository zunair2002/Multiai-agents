import fs from "fs/promises";
import os from "os";
import path from "path";
import crypto from "crypto";
import axios from "axios";
import { getModels } from "./config/llmmodels.js";
import { generatePPT } from "./utils/generateppt.js";
import { uploadPptToCloudinary } from "./utils/uploadppttocloudinary.js";

// Sanitize filename: sirf letters, numbers, underscore allow karo
// Ye Windows/Linux/Mac teeno pe safe hai, aur URL mein bhi koi encoding issue nahi hoga
const sanitizeFileName = (str) => {
  return str
    .replace(/[<>:"/\\|?*]+/g, "")   // Windows-forbidden characters hatao
    .replace(/[^a-zA-Z0-9]+/g, "_")  // baaki sab non-alphanumeric ko underscore
    .replace(/_+/g, "_")             // multiple underscores ko ek kar do
    .replace(/^_|_$/g, "");          // shuru/end ke underscore hatao
};

const saveAssistantMessage = async (chatServiceUrl, payload) => {
  const response = await axios.post(`${chatServiceUrl}/savemessage`, payload);
  if (response.status !== 200) {
    throw new Error("Failed to save message in Chat service.");
  }
};

export const pptagent = async (state) => {
  console.log("--- Starting PPT Agent Workflow (Cloudinary Storage) ---");
  const chatServiceUrl = process.env.CHAT_URL;

  // Local temp file path is tracked outside the try block so the finally
  // block can always clean it up, whether the workflow succeeds or fails.
  let tempFilePath = null;

  try {
    console.log("Step 1: Getting LLM model...");
    const LLM = await getModels("ppt");
    const prompt = `
     You are an Expert Presentation Design Agent. Your task is to take a topic and generate a well-structured JSON output that can be used to create a professional PowerPoint presentation.

Instructions:
- Analyze the topic to understand its key components.
- Generate a title, subtitle, and a series of slides (sections), each with several concise bullet points.
- Keep each slide focused on one idea, with short, presentation-friendly bullet points (not long paragraphs).
- The "title" field is MANDATORY and must NEVER be null or empty.
- Return **ONLY valid JSON**. Do not include markdown code fences (no \`\`\`json), explanations, or extraneous text.

STRUCTURE:
{
  "title": "The Main Title of the Presentation",
  "subtitle": "A Brief, Engaging Subtitle",
  "sections": [
    {
      "title": "Slide 1 Title",
      "points": ["First key point.", "Second key point.", "Third key point."]
    },
    {
      "title": "Slide 2 Title",
      "points": ["First key point.", "Second key point."]
    }
  ]
}
  Topic: ${state.prompt}
     `;

    console.log("Step 2: Calling LLM service...");
    const response = await LLM.invoke(prompt);
    console.log("Step 2a: LLM service responded.");

    if (!response || !response.content) {
      throw new Error("Invalid or empty response from LLM service.");
    }

    let json;
    try {
      console.log("Step 3: Parsing LLM response as JSON...");
      let rawContent = response.content.trim();
      rawContent = rawContent.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
      json = JSON.parse(rawContent);
      console.log("Step 3a: JSON parsing successful.");
    } catch (e) {
      console.error("Failed to parse LLM response. Response was:", response.content);
      throw new Error("Server returned invalid JSON. Check LLM model/prompt.");
    }

    // Safety fallback - title kabhi null/missing na ho
    const safeTitle =
      json?.title && typeof json.title === "string" && json.title.trim().length > 0
        ? json.title.trim()
        : "Untitled_Presentation";
    json.title = safeTitle;

    console.log("Step 4: Generating PPT from JSON...");
    const pptBuffer = await generatePPT(json);
    console.log("Step 4a: PPT generation successful.");

    // Unique filename so concurrent requests / repeated topics never collide
    const cleanTitle = sanitizeFileName(safeTitle);
    const uniqueSuffix = `${Date.now()}_${crypto.randomUUID()}`;
    const fileName = `${cleanTitle}_${uniqueSuffix}.pptx`;

    tempFilePath = path.join(os.tmpdir(), fileName);
    console.log(`Step 5: Saving PPT temporarily to: ${tempFilePath}`);
    await fs.writeFile(tempFilePath, pptBuffer);
    console.log("Step 5a: Temporary PPT saved successfully.");

    console.log("Step 6: Uploading PPT to Cloudinary...");
    const secureUrl = await uploadPptToCloudinary(tempFilePath, fileName);
    console.log(`Step 6a: Uploaded successfully. URL: ${secureUrl}`);

    console.log("Step 7: Calling Chat service to save message...");
    await saveAssistantMessage(chatServiceUrl, {
      conversationId: state.conversationId,
      role: "assistant",
      content: `Your PPT "${safeTitle}" is ready. You can download it here.`,
      fileUrl: secureUrl,
      fileName: `${safeTitle}.pptx`,
    });

    console.log("Step 7a: Chat service saved message successfully.");
    console.log("--- PPT Agent Workflow Finished Successfully ---");

    // Controller ko batao ke message already save ho chuka hai, dobara save na kare
    return { response: { status: "completed" } };
  } catch (error) {
    console.error("PPT agent error:", error);

    // Error case mein bhi khud hi message save karo (agentcontroller mein dobara save na ho)
    try {
      await saveAssistantMessage(chatServiceUrl, {
        conversationId: state.conversationId,
        role: "assistant",
        content: "Sorry, I was unable to generate the PPT. Please try again.",
        fileUrl: null,
        fileName: null,
      });
    } catch (saveErr) {
      console.error("Failed to save error message too:", saveErr.message);
    }

    // Har case mein 'completed' return karo taake duplicate save na ho
    return { response: { status: "completed" } };
  } finally {
    // Local temp file sirf staging ke liye tha - Cloudinary upload ke baad
    // (ya failure ke baad) hamesha delete ho jana chahiye.
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
        console.log(`Cleaned up temporary file: ${tempFilePath}`);
      } catch (cleanupErr) {
        if (cleanupErr.code !== "ENOENT") {
          console.error("Failed to delete temporary PPT file:", cleanupErr.message);
        }
      }
    }
  }
};
