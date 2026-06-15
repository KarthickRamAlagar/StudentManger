import swaggerJSDoc from "swagger-jsdoc";

// SCHEMAS IMPORTS
import {
  authSchema,
  authParameters,
} from "../swagger/swaggerSchemas/auth.schema.js";

import {
  authAdminSchema,
  authAdminParameters,
} from "../swagger/swaggerSchemas/authAdmin.schema.js";

import {
  studentSchema,
  studentParameters,
} from "../swagger/swaggerSchemas/student.schema.js";

// SWAGGER CONFIG
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Student Management System API",
      version: "1.0.0",
      description:
        "Production-grade MERN Student Management System with JWT, RBAC, Redis, Cloudinary",
    },

    servers: [
      {
        url: "http://localhost:8000",
        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Authentication",
        description: "Auth APIs (Signup, Login, Reset, Profile)",
      },
      {
        name: "Auth Admin",
        description: "Admin User Management APIs (RBAC Control)",
      },
      {
        name: "Students",
        description: "Student CRUD + Search + Filters + Upload APIs",
      },
    ],

    components: {
      // SCHEMAS

      schemas: {
        ...authSchema,
        ...authAdminSchema,
        ...studentSchema,
      },

      // PARAMETERS

      parameters: {
        ...authParameters,
        ...authAdminParameters,
        ...studentParameters,
      },

      // SECURITY SCHEME

      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token (Bearer <token>)",
        },
      },
    },
  },
  // SWAGGER ROUTE FILE
  apis: ["./src/swagger/*.swagger.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
