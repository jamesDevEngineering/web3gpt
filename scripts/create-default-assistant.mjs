import { OpenAI } from "openai";

const openai = new OpenAI();

const ToolName = {
	DeployContract: "deployContract",
	ResolveAddress: "resolveAddress",
	ResolveDomain: "resolveDomain",
};

const TOOL_SCHEMAS = {
	[ToolName.DeployContract]: {
		type: "function",
		function: {
			name: "deployContract",
			description: "Deploy a smart contract",
			strict: false,
			parameters: {
				type: "object",
				description:
					"This function deploys a smart contract to an EVM compatible chain. It returns the tx hash of the deployment and an IPFS url to a directory with the files used for the contract deployment.",
				properties: {
					contractName: {
						type: "string",
					},
					chainId: {
						type: "string",
						description:
							"The chainId to deploy to. A list of available chains will be made available to you at runtime.",
						default: "59902",
					},
					sourceCode: {
						type: "string",
						description: `Source code of the smart contract. Format as a single-line string, with all line breaks and quotes escaped to be valid stringified JSON. Do not use any local imports or dependencies. Example import: import "@openzeppelin/contracts/token/ERC20/ERC20.sol" By default use SPDX License Identifier MIT and the latest available fixed Solidity version.`,
					},
					constructorArgs: {
						type: "array",
						description:
							"Array of arguments for the contract's constructor. Each array item is a string or an array of strings. Empty array if the constructor has no arguments.",
						items: {
							oneOf: [
								{ type: "string" },
								{
									type: "array",
									items: { type: "string" },
								},
							],
						},
						default: [],
					},
				},
				required: ["contractName", "chainId", "sourceCode", "constructorArgs"],
			},
		},
	},
	[ToolName.ResolveAddress]: {
		type: "function",
		function: {
			name: "resolveAddress",
			description: "Resolve a cryptocurrency address to a domain",
			strict: false,
			parameters: {
				type: "object",
				description:
					"This function resolves a given cryptocurrency address to a domain. It returns the resolved domain.",
				properties: {
					address: {
						type: "string",
						description:
							"The cryptocurrency address to resolve (e.g., '0x42e9c498135431a48796B5fFe2CBC3d7A1811927')",
					},
				},
				required: ["address"],
			},
		},
	},
	[ToolName.ResolveDomain]: {
		type: "function",
		function: {
			name: "resolveDomain",
			description: "Resolve a domain to a cryptocurrency address",
			strict: false,
			parameters: {
				type: "object",
				description:
					"This function resolves a given domain to a cryptocurrency address. It returns the resolved address.",
				properties: {
					domain: {
						type: "string",
						description: "The domain to resolve (e.g., 'soko.eth')",
					},
					ticker: {
						type: "string",
						description: "The cryptocurrency ticker (default: 'ETH')",
					},
				},
				required: ["domain"],
			},
		},
	},
};

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
