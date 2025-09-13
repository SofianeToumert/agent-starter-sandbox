
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { messages } from "../utils/system-prompt";

export const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

export async function promptGoogle(prompt: string) {
    const model = google("gemini-2.5-flash");
  
    const  { text } = await generateText({
        model,
        messages,
    });
  
    return text;
  }