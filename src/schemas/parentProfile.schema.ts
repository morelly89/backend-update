import { z } from "zod";

export const parentProfileSchema = z.object({
  firstName: z.string().min(2),
  city: z.string(),
  state: z.string().optional(),
  instagram: z.string().optional(),

  // Arrays of UUIDs referencing lookup tables
  needs: z.array(z.string().uuid()).optional(),
  stages: z.array(z.string().uuid()).optional(),
  groups: z.array(z.string().uuid()).optional(),

  // Optional privacy settings update
  privacy: z
    .object({
      isNeedsPublic: z.boolean().optional(),
      isChildStagePublic: z.boolean().optional(),
      isGroupsPublic: z.boolean().optional(),
    })
    .optional(),
});
