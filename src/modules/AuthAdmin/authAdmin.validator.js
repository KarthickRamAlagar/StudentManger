import { z } from "zod";

// update role
export const updateRoleValidator = z.object({
  role: z.enum(["student", "teacher"]),
});

// update status
export const updateStatusValidator = z.object({
  status: z.enum(["active", "inactive", "blocked"]),
});
