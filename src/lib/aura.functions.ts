import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runAuraTool } from "./aura.server";

const AuraRequest = z.object({
  tool: z.enum(["email", "meeting", "tasks", "research"]),
  input: z.record(z.string()),
});

export const generateWithAura = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => AuraRequest.parse(raw))
  .handler(async ({ data }) => runAuraTool(data));
