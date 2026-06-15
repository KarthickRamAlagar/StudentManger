import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "./studentsController.js";

import {
  authMiddleware,
  roleMiddleware,
} from "../../middlewares/auth.middleware.js";

import { upload } from "./upload.middleware.js";

const router = express.Router();

// CREATE
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("teacher"),
  upload.single("profileImage"),
  createStudent,
);
// READ ALL (with search/filter/pagination)
router.get("/get-all", authMiddleware, roleMiddleware("teacher"), getStudents);

// READ ONE
router.get(
  "/get-by-id/:id",
  authMiddleware,
  roleMiddleware("teacher", "student"),
  getStudentById,
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher", "student"),
  upload.single("profileImage"),
  updateStudent,
);

// DELETE
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  deleteStudent,
);

export default router;
