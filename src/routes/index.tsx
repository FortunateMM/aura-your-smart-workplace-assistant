import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  ListChecks,
  Mail,
  MessageSquareText,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { AppShell, DISCLAIMER } from "@/components/app-shell";
import { AuraMark } from "@/components/aura-mark";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OmniWork — Workplace Productivity, Powered by Aura AI" },
      {
        name: "description",
        content:
          "OmniWork brings email drafting, meeting summaries, task planning, research and a conversational assistant into one calm workplace platform, powered by Aura AI.",
      },
      { property: "og:title", content: "OmniWork — Powered by Aura AI" },
      {
        property: "og:description",
        content:
          "One integrated productivity platform: smart email, meeting summaries, task planning, research and the Aura assistant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/smart-email",
    icon: Mail,
    name: "Smart Email",
    blurb: "Turn a short context into a polished, on-tone draft.",
    tint: "bg-primary-soft text-primary",
  },
  {
    to: "/meeting-summarizer",
    icon: CalendarCheck,
    name: "Meeting Summarizer",
    blurb: "Decisions, owners and deadlines from raw notes.",
    tint: "bg-accent-soft text-accent-foreground",
  },
  {
    to: "/task-planner",
    icon: ListChecks,
    name: "Task Planner",
    blurb: "Prioritised workload with a realistic schedule.",
    tint: "bg-secondary text-secondary-foreground",
  },
  {
    to: "/research",
    icon: Search,
    name: "Research Assistant",
    blurb: "Briefings that separate insight from uncertainty.",
    tint: "bg-primary-soft text-primary",
  },
  {
    to: "/aura",
    icon: MessageSquareText,
    name: "Aura AI",
    blurb: "Think out loud with your workplace assistant.",
    tint: "bg-accent-soft text-accent-foreground",
  },
] as const;

const OVERVIEW = [
  { label: "Focus hours protected", value: "12h", hint: "this week", icon: Clock },
  { label: "Drafts & summaries ready", value: "0", hint: "start with a tool below", icon: TrendingUp },
  { label: "Human review rate", value: "100%", hint: "you approve every output", icon: ShieldCheck },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  return (
    <AppShell
      title="Dashboard"
      description="One workspace for writing, planning, summarising and researching."
      actions={
        <Button asChild size="sm">
          <Link to="/aura">
            <AuraMark className="mr-2 size-4" />
            Ask Aura
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6">
        {/* Welcome + Aura introduction */}
        <section className="card-surface overflow-hidden">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                OmniWork · Powered by Aura AI
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{greeting()}, Fortunate 👋</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Aura is ready to help you work smarter. Bring the context — Aura structures the
                prompt, drafts the output and leaves the final judgement to you.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link to="/smart-email">
                    Draft an email
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/task-planner">Plan my week</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-secondary/60 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl aura-glow text-primary-foreground shadow-raised">
                <AuraMark className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold">Meet Aura</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  The intelligence layer across all five OmniWork tools — professional, concise and
                  practical, with every output open to your edits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Productivity overview */}
        <section className="grid gap-4 sm:grid-cols-3">
          {OVERVIEW.map((card) => (
            <div key={card.label} className="card-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
                <card.icon className="size-4 text-primary" aria-hidden />
              </div>
              <p className="mt-3 text-2xl font-semibold">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>
            </div>
          ))}
        </section>

        {/* Quick access */}
        <section>
          <h2 className="text-sm font-semibold">Your Aura toolkit</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="card-surface group flex flex-col gap-3 p-5 transition-shadow hover:shadow-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className={`flex size-10 items-center justify-center rounded-xl ${tool.tint}`}>
                  <tool.icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold">{tool.name}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{tool.blurb}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-primary">
                  Open
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Recent activity */}
          <section className="card-surface p-5">
            <h2 className="text-sm font-semibold">Recent activity</h2>
            <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-10 text-center">
              <AuraMark className="size-6 text-muted-foreground" />
              <p className="text-sm font-medium">No activity yet</p>
              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Emails, summaries, plans and briefings you generate in this session will be listed
                here.
              </p>
            </div>
          </section>

          {/* Productivity insight */}
          <section className="card-surface p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <AuraMark className="size-4 text-primary" />
              Aura&rsquo;s productivity insight
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Batch similar work. Drafting three emails in one sitting is faster than three
              context-switches — and Aura keeps the tone consistent across them.
            </p>
            <ul className="mt-4 grid gap-2 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                Summarise meetings the same day, while context is fresh.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal" />
                Re-plan at the start of the week, not in the middle of a deadline.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-coral" />
                Verify anything from the Research Assistant before it leaves your team.
              </li>
            </ul>
          </section>
        </div>

        {/* Responsible AI notice */}
        <section className="rounded-xl border border-border bg-secondary/50 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-4 text-primary" />
            Responsible AI
          </h2>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
        </section>
      </div>
    </AppShell>
  );
}
