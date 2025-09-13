import { promptOpenAI } from "./providers/openai";
import { promptAnthropic } from "./providers/anthropic";
import { promptGoogle } from "./providers/google";
import { messages } from "./utils/system-prompt";
import { parseTools, executeTool } from "./tools";

const EXIT_COMMAND = "exit";

const providers: Record<string, (prompt: string) => Promise<string>> = {
  "1": promptOpenAI,
  "2": promptAnthropic,
  "3": promptGoogle,
};

function selectProvider() {
  console.log("What provider do you want to use? choose 1, 2 or 3");
  console.log("1. OpenAI");
  console.log("2. Anthropic");
  console.log("3. Google");

  let provider: string | null;

  while (true) {
  provider = prompt("Provider: ");

    if (!provider || !providers[provider]) {
      console.log("Invalid provider");
    } else {
      break;
    }
  }

  console.log(`Provider ${provider} selected.\n`);

  return provider;
}

async function runAgent(input: string, provider: string) {
  if (input) {
    messages.push({ role: "user", content: input });
  }


  const response = await providers[provider](input);

  console.log(`Agent: ${response}`);

  const tools = parseTools(response);

  if (tools.length === 0) return;

  for (const tool of tools) {
    const result = await executeTool(tool);

    console.log(`Tool: ${tool.name} Result: ${result}`);

    messages.push({ role: "user", content: `<tool name="${tool.name}" params="${JSON.stringify(tool.params)}">${result}</tool>`  });
  }
}

async function startAgent() {
  console.log(`Agent Started! Type '${EXIT_COMMAND}' to quit.\n`);

  const provider = selectProvider();

  console.log("What can I do for you?");

  while (true) {
    const input = prompt("You: ");

    if (input === EXIT_COMMAND) {
      console.log("Agent Stopped!");
      break;
    }

    if (input) {
      await runAgent(input, provider);
    }
  }
}

startAgent();


