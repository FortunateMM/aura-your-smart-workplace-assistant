import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { AuraOutput } from "@/components/aura-output";
import { Field, FormCard, ToolGrid } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAura } from "@/hooks/use-aura";

export const Route = createFileRoute("/smart-email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | OmniWork" },
      {
        name: "description",
        content:
          "Turn a short workplace context into a polished, on-tone email draft with Aura, then edit, copy or regenerate it.",
      },
      { property: "og:title", content: "Smart Email Generator | OmniWork" },
      {
        property: "og:description",
        content: "Draft professional workplace emails in formal, friendly or persuasive tones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SmartEmailPage,
});

function SmartEmailPage() {
  const aura = useAura("email");
  const [context, setContext] = useState("");
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState("Formal");
  const [length, setLength] = useState("Concise (under 150 words)");
  const [errors, setErrors] = useState<{ context?: string; purpose?: string }>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (context.trim().length < 15) next.context = "Give Aura at least a sentence or two of context.";
    if (!purpose.trim()) next.purpose = "Describe what this email should achieve.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    aura.generate({ context, recipient, purpose, points, tone, length });
  };

  return (
    <AppShell
      title="Smart Email Generator"
      description="Context in, a professional draft out — in the tone your recipient expects."
    >
      <ToolGrid
        form={
          <FormCard
            title="Email brief"
            intro="Aura builds a structured prompt from these fields: context, recipient, purpose, key points, tone and length."
            onSubmit={submit}
          >
            <Field
              label="Context"
              htmlFor="context"
              required
              hint="What's happening?"
              error={errors.context}
            >
              <Textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="The Q3 vendor review slipped by a week because the data export failed. I need to tell the operations lead and propose a new date."
                className="min-h-28"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Recipient" htmlFor="recipient" hint="Role or relationship">
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Operations lead, external client…"
                />
              </Field>
              <Field label="Tone" htmlFor="tone">
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Formal", "Friendly", "Persuasive", "Apologetic", "Direct"].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="Purpose" htmlFor="purpose" required error={errors.purpose}>
              <Input
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Get agreement on a new review date"
              />
            </Field>

            <Field label="Key points" htmlFor="points" hint="One per line, optional">
              <Textarea
                id="points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder={"Data export failed on Monday\nNew date proposed: 14 October\nNo impact on the client deadline"}
                className="min-h-24"
              />
            </Field>

            <Field label="Length" htmlFor="length">
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger id="length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Very short (under 80 words)",
                    "Concise (under 150 words)",
                    "Standard (150–250 words)",
                  ].map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Button type="submit" disabled={aura.isPending} className="w-full">
              <Send className="mr-2 size-4" />
              {aura.isPending ? "Drafting…" : "Generate draft"}
            </Button>
          </FormCard>
        }
        output={
          <AuraOutput
            title="Email draft"
            output={aura.output}
            onChange={aura.setOutput}
            isPending={aura.isPending}
            error={aura.error}
            onRegenerate={aura.regenerate}
            canRegenerate={aura.canRegenerate}
            emptyHint="Fill in the brief and Aura will return a subject line and a ready-to-send draft you can edit inline before copying."
          />
        }
      />
    </AppShell>
  );
}
