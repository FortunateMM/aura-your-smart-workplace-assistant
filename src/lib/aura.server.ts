import { streamText } from "ai";
import { getAuraModel } from "./ai-gateway.server";
import { buildAuraPrompt, type AuraInput, type AuraTool } from "./aura-prompts";

export async function runAuraTool(data: { tool: AuraTool; input: AuraInput }) {
  const { system, prompt } = buildAuraPrompt(data.tool, data.input);

  const result = streamText({
    model: getAuraModel(),
    system,
    prompt,
    temperature: 0.6,
  });

  const text = await result.text;
  return { text };
}
