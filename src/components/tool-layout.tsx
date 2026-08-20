import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";

export function ToolGrid({ form, output }: { form: ReactNode; output: ReactNode }) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      {form}
      {output}
    </div>
  );
}

export function FormCard({
  title,
  intro,
  onSubmit,
  children,
}: {
  title: string;
  intro: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="card-surface flex flex-col gap-5 p-5">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{intro}</p>
      </div>
      {children}
    </form>
  );
}

export function Field({
  label,
  hint,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  error?: string | undefined;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wide">
          {label}
          {required ? <span className="ml-1 text-coral">*</span> : null}
        </Label>
        {hint ? <span className="text-[11px] text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
