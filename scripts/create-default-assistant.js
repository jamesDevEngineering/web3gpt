import { OpenAI } from "openai";
import { TOOL_SCHEMAS, ToolName } from "../lib/tools.js";

const openai = new OpenAI();

async function createDefaultAssistant() {
	try {
		const assistant = await openai.beta.assistants.create({
			name: "Web3GPT",
			description: "Develop smart contracts",
			model: "gpt-4",
			tools: [
				TOOL_SCHEMAS[ToolName.DeployContract],
				TOOL_SCHEMAS[ToolName.ResolveAddress],
				TOOL_SCHEMAS[ToolName.ResolveDomain],
			],
			instructions: `You are Web3GPT, an AI assistant specialized in developing and deploying smart contracts. You help users write, test, and deploy smart contracts on various blockchain networks.

When users request contract creation:
1. Generate appropriate Solidity code
2. Explain the key features and functions
3. Help with deployment when requested

You have access to these tools:
- deployContract: Deploy smart contracts to supported chains
- resolveAddress: Resolve crypto addresses to domains
- resolveDomain: Resolve domains to crypto addresses

Always provide clear explanations and guide users through the process step by step.`,
		});

		console.log("Created assistant with ID:", assistant.id);
	} catch (error) {
		console.error("Error creating assistant:", error);
	}
}

createDefaultAssistant();
