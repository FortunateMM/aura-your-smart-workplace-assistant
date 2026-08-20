import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { AuraOutput } from "@/components/aura-output";
import { Field, FormCard, ToolGrid } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAura } from "@/hooks/use-aura";

export const Route = createFileRoute("/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | OmniWork" },
      {
        name: "description",
        content:
          "Paste raw meeting notes and get a structured summary with decisions, action items, owners and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | OmniWork" },
      {
        property: "og:description",
        content: "Structured summaries, key decisions, action items and deadlines from messy notes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingPage,
});

function MeetingPage() {
  const aura = useAura("meeting");
  const [title, setTitle] = useState("");
  const [attendees, setAttendees] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string>();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (notes.trim().length < 40) {
      setError("Paste at least a few lines of notes so Aura has something to work with.");
      return;
    }
    setError(undefined);
    aura.generate({ title, attendees, notes });
  };

  const words = notes.trim() ? notes.trim().split(/\s+/).length : 0;

  return (
    <AppShell
      title="Meeting Notes Summarizer"
      description="Messy notes become decisions, owners and deadlines."
    >
      <ToolGrid
        form={
          <FormCard
            title="Meeting notes"
            intro="Aura only uses what you paste — it will mark anything the notes don't state instead of guessing owners or dates."
            onSubmit={submit}
          >
            <Field label="Meeting title" htmlFor="title" hint="Optional">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Weekly ops sync"
              />
            </Field>
            <Field label="Attendees" htmlFor="attendees" hint="Optional, first names are fine">
              <Input
                id="attendees"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                placeholder="Fortunate, Thabo, Lerato"
              />
            </Field>
            <Field
              label="Raw notes"
              htmlFor="notes"
              required
              hint={words ? `${words} words` : "Paste anything"}
              error={error}
            >
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  "- budget discussion, finance wants revised numbers\n- Thabo to redo forecast by Friday\n- agreed to postpone the vendor demo\n- open question: who signs off the new SLA?"
                }
                className="min-h-64"
              />
            </Field>
            <Button type="submit" disabled={aura.isPending} className="w-full">
              <FileText className="mr-2 size-4" />
              {aura.isPending ? "Summarising…" : "Summarise meeting"}
            </Button>
          </FormCard>
        }
        output={
          <AuraOutput
            title="Structured summary"
            output={aura.output}
            onChange={aura.setOutput}
            isPending={aura.isPending}
            error={aura.error}
            onRegenerate={aura.regenerate}
            canRegenerate={aura.canRegenerate}
            emptyHint="Your summary will arrive in five sections: Summary, Key Decisions, Action Items, Deadlines and Open Questions — all editable before you share them."
          />
        }
      />
    </AppShell>
  );
}
