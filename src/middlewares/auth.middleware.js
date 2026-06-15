import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// AUTH MIDDLEWARE

export const authMiddleware = (req, res, next) => {
  try {
    // Get Token from Headers

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    // Verify Token

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Attach User Payload

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token Expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

// ROLE BASED AUTHORIZATION

export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You Do Not Have Access",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};
