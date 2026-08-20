import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
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

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | OmniWork" },
      {
        name: "description",
        content:
          "Brief Aura on a workplace topic and get a summary, key insights, recommendations, follow-up questions and stated limitations.",
      },
      { property: "og:title", content: "AI Research Assistant | OmniWork" },
      {
        property: "og:description",
        content: "Workplace research briefings that separate what's established from what needs verifying.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const aura = useAura("research");
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [depth, setDepth] = useState("Balanced briefing");
  const [audience, setAudience] = useState("Team leads");
  const [error, setError] = useState<string>();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topic.trim().length < 8) {
      setError("Describe the topic or question in a little more detail.");
      return;
    }
    setError(undefined);
    aura.generate({ topic, context, depth, audience });
  };

  return (
    <AppShell
      title="AI Research Assistant"
      description="Briefings that say plainly what's established and what still needs checking."
    >
      <ToolGrid
        form={
          <FormCard
            title="Research brief"
            intro="Aura won't fabricate statistics, studies or sources. Anything uncertain or time-sensitive is flagged for you to verify."
            onSubmit={submit}
          >
            <Field label="Topic or question" htmlFor="topic" required error={error}>
              <Textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What should we consider before moving our team to a four-day work week?"
                className="min-h-24"
              />
            </Field>
            <Field label="Why it matters" htmlFor="context" hint="Optional context">
              <Textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="We're a 30-person operations team with client SLAs during business hours."
                className="min-h-20"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Depth" htmlFor="depth">
                <Select value={depth} onValueChange={setDepth}>
                  <SelectTrigger id="depth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Quick orientation", "Balanced briefing", "In-depth analysis"].map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Audience" htmlFor="audience">
                <Input
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Executives, team leads, clients…"
                />
              </Field>
            </div>
            <Button type="submit" disabled={aura.isPending} className="w-full">
              <Search className="mr-2 size-4" />
              {aura.isPending ? "Researching…" : "Generate briefing"}
            </Button>
          </FormCard>
        }
        output={
          <AuraOutput
            title="Research briefing"
            output={aura.output}
            onChange={aura.setOutput}
            isPending={aura.isPending}
            error={aura.error}
            onRegenerate={aura.regenerate}
            canRegenerate={aura.canRegenerate}
            emptyHint="Expect a topic summary, key insights, points to consider, recommendations, follow-up questions and an explicit confidence-and-limitations note."
          />
        }
      />
    </AppShell>
  );
}
