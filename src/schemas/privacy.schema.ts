import { z } from "zod";

export const privacySchema = z.object({
  isNeedsPublic: z.boolean().optional(),
  isChildStagePublic: z.boolean().optional(),
  isGroupsPublic: z.boolean().optional(),
});