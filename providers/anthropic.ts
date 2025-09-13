import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { messages } from "../utils/system-prompt";

export const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function promptAnthropic(prompt: string) {
    const model = anthropic("claude-3-5-sonnet-20240620");
  
    const { text } = await generateText({
        model,
        messages,
    });
  
    return text;
  }