import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { TriangleAlert } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { AppShell } from "@/components/app-shell";
import { AuraBadge, AuraMark } from "@/components/aura-mark";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/aura")({
  head: () => ({
    meta: [
      { title: "Aura AI Assistant | OmniWork" },
      {
        name: "description",
        content:
          "Chat with Aura, the OmniWork workplace assistant, for planning, writing, brainstorming and summarising work.",
      },
      { property: "og:title", content: "Aura AI Assistant | OmniWork" },
      {
        property: "og:description",
        content: "A professional conversational assistant for everyday workplace tasks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuraChatPage,
});

const STARTERS = [
  "Help me plan a realistic week around three deadlines",
  "Rewrite this update so it's clearer for executives",
  "Brainstorm ways to cut our meeting load",
  "Summarise the trade-offs of hiring vs outsourcing",
];

function AuraChatPage() {
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    void sendMessage({ text: trimmed });
  };

  return (
    <AppShell title="Aura AI" description="Your workplace assistant for planning, writing and thinking out loud.">
      <div className="card-surface flex h-[calc(100dvh-16rem)] min-h-[30rem] flex-col overflow-hidden">
        <Conversation className="flex-1">
          <ConversationContent className="gap-6">
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<AuraMark className="size-9 text-primary" />}
                title="Aura is ready"
                description="Ask about planning, writing, productivity, brainstorming or summarising. Keep confidential details out of the chat."
              >
                <div className="mt-4 grid w-full max-w-xl gap-2 sm:grid-cols-2">
                  {STARTERS.map((s) => (
                    <Button
                      key={s}
                      variant="outline"
                      className="h-auto justify-start whitespace-normal px-3 py-2.5 text-left text-xs"
                      onClick={() => send(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </ConversationEmptyState>
            ) : null}

            {messages.map((message) => {
              const text = message.parts
                .filter((part) => part.type === "text")
                .map((part) => ("text" in part ? part.text : ""))
                .join("");

              if (!text) return null;

              return (
                <Message from={message.role} key={message.id}>
                  <MessageContent
                    className={
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent p-0 text-foreground"
                    }
                  >
                    {message.role === "assistant" ? (
                      <>
                        <MessageResponse>{text}</MessageResponse>
                        <div className="mt-3">
                          <AuraBadge />
                        </div>
                      </>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm">{text}</p>
                    )}
                  </MessageContent>
                </Message>
              );
            })}

            {status === "submitted" ? (
              <Shimmer className="px-1 text-sm font-medium">Aura is thinking…</Shimmer>
            ) : null}

            {error ? (
              <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                <div>
                  <p className="font-medium">Aura couldn&rsquo;t respond</p>
                  <p className="mt-1 text-destructive/85">{error.message}</p>
                </div>
              </div>
            ) : null}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border bg-card p-3 sm:p-4">
          <PromptInput
            onSubmit={(message) => {
              send(message.text);
            }}
          >
            <PromptInputTextarea placeholder="Ask Aura anything about your work…" />
            <PromptInputFooter className="justify-between">
              <span className="hidden text-[11px] text-muted-foreground sm:inline">
                Aura-generated · Review before use
              </span>
              <PromptInputSubmit status={status} onClick={busy ? () => void stop() : undefined} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </AppShell>
  );
}
