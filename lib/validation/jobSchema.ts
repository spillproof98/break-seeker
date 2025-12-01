import { z } from "zod";

export const jobSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  location: z
    .string()
    .min(2, "Location is required")
    .max(120, "Location too long"),
  type: z.enum(["Full-time", "Part-time", "Contract"]),
  isActive: z.boolean().default(true),
});

export type JobFormValues = z.infer<typeof jobSchema>;
