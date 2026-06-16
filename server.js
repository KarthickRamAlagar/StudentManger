import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

// Config Imports
import connectDB from "./src/config/db.js";
import redisClient from "./src/config/redis.js";

// Route Imports
import authRoutes from "./src/modules/Auth/authRoutes.js";
import authAdminRoutes from "./src/modules/AuthAdmin/authAdminRoutes.js";
import studentsRoutes from "./src/modules/Students/students.routes.js";



// Swagger Imports
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import { seedAdminUser } from "./src/seeds/admin.seed.js";

// Environment Variables
dotenv.config();

// App Initialization
const app = express();
const PORT = process.env.BACKEND_PORT || 8000;

// DEFAULT MIDDLEWARE
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman and server-to-server requests
      if (!origin) return callback(null, true);

      // Allow localhost during development
      if (origin.includes("localhost")) {
        return callback(null, true);
      }

      // Allow Vercel deployments
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// logger Middleware
app.use((req, res, next) => {
  res.on("finish", () => {
    const timestamp = new Date().toISOString();

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode}`,
    );
  });

  next();
});

app.use((req, res, next) => {
  console.log(" REQUEST HIT:", req.method, req.originalUrl);
  next();
});


// Security Middleware
app.use(helmet());

// Router Usage
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management System API Running Successfully",
  });
});
app.use("/api/v1/EduManager/auth", authRoutes);
app.use("/api/v1/EduManager/authAdmin", authAdminRoutes);
app.use("/api/v1/EduManager/students", studentsRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Centralized Error Catching
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// // Initialization of DB
async function initializeServices() {
  try {
    // MongoDB Connection
    await connectDB();

    // Redis Connection
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    console.log("Redis Connected Successfully");

    // Redis Health Check
    await redisClient.set("health-check", "ok");

    const result = await redisClient.get("health-check");

    console.log("Redis Test Value:", result);
  } catch (error) {
    console.error("Service Initialization Failed");
    console.error(error);

    process.exit(1);
  }
}

// Server Listening
async function startServer() {
  await initializeServices();

  // Seed Script
  if (process.env.RUN_SEED_ADMIN === "true") {
    try {
      await seedAdminUser();
      console.log("Admin user seeding completed");
    } catch (error) {
      console.error("Admin Seeding Failed", err.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`
=================================================
 Student Management System API Started
=================================================
 Server  : http://localhost:${PORT}
 Swagger : http://localhost:${PORT}/api-docs
=================================================
`);
  });
}

startServer();
