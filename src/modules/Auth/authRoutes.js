import express from "express";

import {
  signUp,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  refreshToken,
} from "./authController.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

import {
  signupRateLimiter,
  loginRateLimiter,
  refreshRateLimiter,
  apiRateLimiter,
} from "../../middlewares/rateLimit.middleware.js";

const router = express.Router();

console.log("🔥 AUTH ROUTES FILE EXECUTED");

// PUBLIC ROUTES
// Signup
router.post("/signup", signupRateLimiter, signUp);

// Login
router.post("/login", loginRateLimiter, login);

// Forgot Password
router.post("/forgot-password", apiRateLimiter, forgotPassword);

// Reset Password
router.post("/reset-password", apiRateLimiter, resetPassword);

// Refresh Token
router.post("/refresh", refreshRateLimiter, refreshToken);

// PROTECTED ROUTES
// Logout
router.post("/logout", authMiddleware, logout);

// Get Profile
router.get("/me", authMiddleware, getProfile);

// console.log("✅ AUTH ROUTES LOADED");
export default router;
