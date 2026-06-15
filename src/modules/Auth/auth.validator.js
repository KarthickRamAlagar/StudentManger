import { z } from "zod";

// SIGNUP VALIDATION

export const signUpValidator = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),

  email: z
    .string()
    .email("Invalid email format")
    .transform((value) => value.toLowerCase().trim()),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),

  role: z.enum(["teacher", "student"]).optional(),
});

// LOGIN VALIDATION

export const loginValidator = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((value) => value.toLowerCase().trim()),

  password: z.string().min(1, "Password is required"),
});

// FORGOT PASSWORD VALIDATION

export const forgotPasswordValidator = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((value) => value.toLowerCase().trim()),
});

// REFRESH TOKEN VALIDATION

export const refreshTokenValidator = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});
