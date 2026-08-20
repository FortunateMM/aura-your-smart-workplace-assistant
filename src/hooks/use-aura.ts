import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { generateWithAura } from "@/lib/aura.functions";
import type { AuraInput, AuraTool } from "@/lib/aura-prompts";

export function useAura(tool: AuraTool) {
  const run = useServerFn(generateWithAura);
  const [output, setOutput] = useState("");
  const [lastInput, setLastInput] = useState<AuraInput | null>(null);

  const mutation = useMutation({
    mutationFn: async (input: AuraInput) => {
      setLastInput(input);
      return run({ data: { tool, input } });
    },
    onSuccess: (result) => setOutput(result.text.trim()),
  });

  return {
    output,
    setOutput,
    generate: (input: AuraInput) => mutation.mutate(input),
    regenerate: () => lastInput && mutation.mutate(lastInput),
    canRegenerate: Boolean(lastInput),
    isPending: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : mutation.error ? String(mutation.error) : null,
  };
}
