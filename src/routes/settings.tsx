import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

import { AppShell, DISCLAIMER } from "@/components/app-shell";
import { AuraMark } from "@/components/aura-mark";
import { Field } from "@/components/tool-layout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | OmniWork" },
      {
        name: "description",
        content:
          "Manage your OmniWork workspace profile, Aura defaults and responsible-AI preferences.",
      },
      { property: "og:title", content: "Settings | OmniWork" },
      {
        property: "og:description",
        content: "Workspace profile, Aura tone defaults and responsible-AI preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Fortunate");
  const [role, setRole] = useState("Operations Manager");
  const [tone, setTone] = useState("Formal");
  const [showBadges, setShowBadges] = useState(true);
  const [confidentialityReminder, setConfidentialityReminder] = useState(true);

  return (
    <AppShell title="Settings" description="Workspace profile and how Aura behaves by default.">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-5">
          <h2 className="text-sm font-semibold">Profile</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Used for greetings and to give Aura light context about your role.
          </p>
          <div className="mt-5 grid gap-5">
            <Field label="Display name" htmlFor="name">
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Role" htmlFor="role">
              <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
            </Field>
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <AuraMark className="size-4 text-primary" />
            Aura defaults
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Preferred starting tone for generated drafts and briefings.
          </p>
          <div className="mt-5 grid gap-5">
            <Field label="Default tone" htmlFor="tone">
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Formal", "Friendly", "Persuasive", "Direct"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
              <div>
                <Label htmlFor="badges" className="text-sm">
                  Show &ldquo;Aura-generated&rdquo; labels
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Keeps review reminders next to every generated output.
                </p>
              </div>
              <Switch id="badges" checked={showBadges} onCheckedChange={setShowBadges} />
            </div>
            <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
              <div>
                <Label htmlFor="confidentiality" className="text-sm">
                  Confidentiality reminder
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Warns you not to paste sensitive or personal information.
                </p>
              </div>
              <Switch
                id="confidentiality"
                checked={confidentialityReminder}
                onCheckedChange={setConfidentialityReminder}
              />
            </div>
          </div>
        </section>

        <section className="card-surface p-5 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-4 text-primary" />
            Responsible AI
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
          <Separator className="my-5" />
          <ul className="grid gap-2 text-xs leading-relaxed text-muted-foreground sm:grid-cols-2">
            <li>Aura is instructed never to invent facts, figures, sources or owners.</li>
            <li>Uncertainty is stated explicitly rather than hidden behind confident wording.</li>
            <li>Every output is editable so a human stays accountable for the final version.</li>
            <li>Preferences here are session-only — nothing is stored on a server.</li>
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
