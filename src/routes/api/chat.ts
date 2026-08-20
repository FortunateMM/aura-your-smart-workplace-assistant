import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getAuraModel } from "@/lib/ai-gateway.server";
import { AURA_CHAT_SYSTEM } from "@/lib/aura-prompts";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let messages: UIMessage[] = [];
        try {
          const body = (await request.json()) as { messages?: UIMessage[] };
          messages = Array.isArray(body.messages) ? body.messages : [];
        } catch {
          return new Response("Invalid request body", { status: 400 });
        }

        if (messages.length === 0) {
          return new Response("No messages provided", { status: 400 });
        }

        try {
          const result = streamText({
            model: getAuraModel(),
            system: AURA_CHAT_SYSTEM,
            messages: convertToModelMessages(messages),
            temperature: 0.7,
          });

          return result.toUIMessageStreamResponse();
        } catch (error) {
          const message = error instanceof Error ? error.message : "Aura could not respond.";
          return new Response(message, { status: 500 });
        }
      },
    },
  },
});
