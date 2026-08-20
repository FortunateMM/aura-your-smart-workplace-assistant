import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
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

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | OmniWork" },
      {
        name: "description",
        content:
          "Drop in your workload and Aura prioritises it, flags what's urgent, proposes a schedule and explains its reasoning.",
      },
      { property: "og:title", content: "AI Task Planner | OmniWork" },
      {
        property: "og:description",
        content: "Prioritised tasks, an achievable schedule and clear reasoning for every call.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TaskPlannerPage,
});

function TaskPlannerPage() {
  const aura = useAura("tasks");
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState("This week");
  const [capacity, setCapacity] = useState("");
  const [goals, setGoals] = useState("");
  const [error, setError] = useState<string>();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const count = tasks.split("\n").filter((l) => l.trim()).length;
    if (count < 2) {
      setError("List at least two tasks, one per line, so there is something to prioritise.");
      return;
    }
    setError(undefined);
    aura.generate({ tasks, horizon, capacity, goals });
  };

  return (
    <AppShell
      title="AI Task Planner"
      description="One prioritised plan with the reasoning behind every call."
    >
      <ToolGrid
        form={
          <FormCard
            title="Your workload"
            intro="Include deadlines and rough effort where you know them — Aura respects what you state and never invents tasks."
            onSubmit={submit}
          >
            <Field
              label="Tasks"
              htmlFor="tasks"
              required
              hint="One per line"
              error={error}
            >
              <Textarea
                id="tasks"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                placeholder={
                  "Finish Q3 vendor report — due Thursday, ~4h\nPrep onboarding deck for new hire — starts Monday\nReview two pull requests\nRespond to procurement email"
                }
                className="min-h-52"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Horizon" htmlFor="horizon">
                <Select value={horizon} onValueChange={setHorizon}>
                  <SelectTrigger id="horizon">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Today", "Next 3 days", "This week", "Next two weeks"].map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Capacity" htmlFor="capacity" hint="Optional">
                <Input
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="08:00–16:30, meetings 10–12 daily"
                />
              </Field>
            </div>
            <Field label="Goals & constraints" htmlFor="goals" hint="Optional">
              <Textarea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Protect deep-work mornings. The vendor report matters most this week."
                className="min-h-20"
              />
            </Field>
            <Button type="submit" disabled={aura.isPending} className="w-full">
              <ListChecks className="mr-2 size-4" />
              {aura.isPending ? "Planning…" : "Build my plan"}
            </Button>
          </FormCard>
        }
        output={
          <AuraOutput
            title="Prioritised plan"
            output={aura.output}
            onChange={aura.setOutput}
            isPending={aura.isPending}
            error={aura.error}
            onRegenerate={aura.regenerate}
            canRegenerate={aura.canRegenerate}
            emptyHint="You'll get a priority order, urgent items, a suggested schedule, the reasoning per task and watch-outs — edit anything before committing to it."
          />
        }
      />
    </AppShell>
  );
}
