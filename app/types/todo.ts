import { z } from "zod";

export const Ztodo = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "DONE"]),
});
