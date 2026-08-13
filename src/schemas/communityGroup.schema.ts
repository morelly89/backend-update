import { z } from "zod";

export const communityGroupSchema = z.object({
  name: z.string().min(2),
  city: z.string(),
  state: z.string(),
  website: z.string().url(),
  description: z.string().optional(),
});