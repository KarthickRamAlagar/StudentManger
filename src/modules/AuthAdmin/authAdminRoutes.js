import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
} from "./authAdminController.js";

import {
  authMiddleware,
  roleMiddleware,
} from "../../middlewares/auth.middleware.js";


const router = express.Router();

// GET ALL USERS
router.get("/users", authMiddleware,roleMiddleware("admin"),getAllUsers);

// GET USER BY ID
router.get("/users/:id",authMiddleware,roleMiddleware("admin"), getUserById);

// UPDATE ROLE
router.patch("/users/:id/role",authMiddleware,roleMiddleware("admin"), updateUserRole);

// UPDATE STATUS
router.patch("/users/:id/status", authMiddleware,roleMiddleware("admin"),updateUserStatus);

// console.log(" AUTH ADMIN ROUTES LOADED");
export default router;
