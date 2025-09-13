import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { messages } from "../utils/system-prompt";

export const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function promptOpenAI(prompt: string) {
    const model = openai.responses("gpt-5");

const { text } = await generateText({
    model,
    messages,
});

    return text;
}