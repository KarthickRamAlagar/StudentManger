import rateLimit from "express-rate-limit";

// GENERAL API LIMITER

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  message: {
    success: false,
    message: "Too Many Requests. Please Try Again Later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

// LOGIN RATE LIMITER

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,

  message: {
    success: false,
    message: "Too Many Login Attempts. Try Again Later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

// SIGNUP RATE LIMITER

export const signupRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,

  message: {
    success: false,
    message: "Too Many Signup Attempts. Try Again Later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

// ADMIN CREATE / UPDATE / DELETE LIMITER

export const adminWriteRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,

  message: {
    success: false,
    message: "Too Many Admin Operations. Please Try Again Later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});


// Refresh Token Rate Limiter
export const refreshRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // allows normal usage but prevents abuse
  message: {
    success: false,
    message: "Too many refresh requests.",
  },
});