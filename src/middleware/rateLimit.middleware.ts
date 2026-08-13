import rateLimit from "express-rate-limit";

// Protect auth routes (login/register)
export const authRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per window
  message: "Too many login attempts. Please try again later.",
});

// Protect general API routes
export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
  message: "Too many requests. Slow down.",
});
