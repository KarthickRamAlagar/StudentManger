import { z } from "zod";

export const createStudentValidator = z.object({
  name: z.string().min(2).max(100).trim(),

  email: z
    .string()
    .email()
    .transform((v) => v.toLowerCase().trim()),

  studentId: z.string().min(3).max(50).trim(),

  department: z.string().min(2).max(50).trim(),

  year: z.number().min(1).max(4),

  phone: z.string().min(10).max(15),

  address: z.string().min(5).max(200),
});

// UPDATE VALIDATION (partial update)
export const updateStudentValidator = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  email: z
    .string()
    .email()
    .transform((v) => v.toLowerCase().trim())
    .optional(),
  studentId: z.string().min(3).max(50).trim().optional(),
  department: z.string().min(2).max(50).trim().optional(),
  year: z.number().min(1).max(4).optional(),
  phone: z.string().min(10).max(15).optional(),
  address: z.string().min(5).max(200).optional(),
});
