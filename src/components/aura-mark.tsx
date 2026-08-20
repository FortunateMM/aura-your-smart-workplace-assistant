import { cn } from "@/lib/utils";

/** Abstract intelligence mark for Aura — a four-point sparkle inside a soft ring. */
export function AuraMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="Aura"
      className={cn("size-6", className)}
      fill="none"
    >
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeOpacity="0.25" />
      <path
        d="M16 5.5c.5 4.4 1.9 6.6 4.9 7.6-3 1-4.4 3.2-4.9 7.6-.5-4.4-1.9-6.6-4.9-7.6 3-1 4.4-3.2 4.9-7.6Z"
        fill="currentColor"
      />
      <path
        d="M22.8 19.4c.25 2.1.95 3.2 2.4 3.7-1.45.5-2.15 1.6-2.4 3.7-.25-2.1-.95-3.2-2.4-3.7 1.45-.5 2.15-1.6 2.4-3.7Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
    </svg>
  );
}

export function AuraBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent-foreground",
        className,
      )}
    >
      <AuraMark className="size-3.5" />
      Aura-generated · Review before use
    </span>
  );
}

export function AuraLogo({ subdued = false }: { subdued?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl aura-glow text-primary-foreground shadow-card",
          subdued && "opacity-95",
        )}
      >
        <AuraMark className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-semibold tracking-tight">OmniWork</span>
        <span className="block text-[11px] opacity-70">Powered by Aura AI</span>
      </span>
    </div>
  );
}
