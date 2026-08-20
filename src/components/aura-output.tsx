import { Check, Copy, Eye, Pencil, RefreshCw, TriangleAlert } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { AuraBadge, AuraMark } from "@/components/aura-mark";
import { Button } from "@/components/ui/button";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Textarea } from "@/components/ui/textarea";

export function AuraOutput({
  title,
  output,
  onChange,
  isPending,
  error,
  onRegenerate,
  canRegenerate,
  emptyHint,
}: {
  title: string;
  output: string;
  onChange: (value: string) => void;
  isPending: boolean;
  error: string | null;
  onRegenerate: () => void;
  canRegenerate: boolean;
  emptyHint: string;
}) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn't access the clipboard");
    }
  };

  return (
    <section className="card-surface flex min-h-[22rem] flex-col overflow-hidden" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <AuraMark className="size-4 text-primary" />
          {title}
        </h2>
        {output ? (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing((v) => !v)}>
              {editing ? <Eye className="mr-1.5 size-4" /> : <Pencil className="mr-1.5 size-4" />}
              {editing ? "Preview" : "Edit"}
            </Button>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? <Check className="mr-1.5 size-4" /> : <Copy className="mr-1.5 size-4" />}
              Copy
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onRegenerate}
              disabled={!canRegenerate || isPending}
            >
              <RefreshCw className={`mr-1.5 size-4 ${isPending ? "animate-spin" : ""}`} />
              Regenerate
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {error ? (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            <div>
              <p className="font-medium">Aura couldn&rsquo;t complete that request</p>
              <p className="mt-1 text-destructive/85">{error}</p>
            </div>
          </div>
        ) : null}

        {isPending && !output ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <AuraMark className="size-8 animate-pulse text-primary" />
            <Shimmer className="text-sm font-medium">Aura is thinking&hellip;</Shimmer>
            <p className="max-w-xs text-xs text-muted-foreground">
              Structuring your context into a clear, workplace-ready draft.
            </p>
          </div>
        ) : null}

        {!isPending && !output && !error ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <AuraMark className="size-5" />
            </span>
            <p className="text-sm font-medium">Nothing here yet</p>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{emptyHint}</p>
          </div>
        ) : null}

        {output ? (
          editing ? (
            <Textarea
              value={output}
              onChange={(e) => onChange(e.target.value)}
              aria-label={`${title} — editable output`}
              className="min-h-[18rem] flex-1 resize-y font-mono text-[13px] leading-relaxed"
            />
          ) : (
            <div className="prose prose-sm max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          )
        ) : null}

        {output ? (
          <div className="mt-auto pt-2">
            <AuraBadge />
          </div>
        ) : null}
      </div>
    </section>
  );
}
