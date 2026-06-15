import bcrypt from "bcrypt";
import User from "../../db/user.collection.js";

import {
  createStudentRepo,
  getStudentsRepo,
  countStudentsRepo,
  findStudentByIdRepo,
  updateStudentRepo,
  deleteStudentRepo,
} from "./students.repository.js";

import {
  setStudentsCache,
  getStudentsCache,
  clearStudentsCache,
} from "./students.cache.js";

import { uploadToCloudinary } from "../../utils/Cloudinary/cloudinary.utils.js";
import { generateRandomPassword } from "../../utils/Auth/passwordGenerator.js";

// CREATE STUDENT

export const createStudentService = async (data, file, teacherId) => {
  const { name, email, studentId, department, year, phone, address } = data;

  // 1. Check duplicate user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // 2. Generate password
  const plainPassword = generateRandomPassword(10);
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // 3. Create USER (login account)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "student",
  });

  // 4. Upload image (optional)
  let profileImage = {
    public_id: null,
    secure_url: null,
  };

  if (file) {
    const result = await uploadToCloudinary(file.buffer, "students", "image");

    profileImage = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  // 5. Create STUDENT record
  const student = await createStudentRepo({
    userId: user._id,
    studentId,
    department,
    year,
    phone,
    address,
    profileImage,
    createdBy: teacherId,
  });

  // 6. clear cache
  await clearStudentsCache();

  return {
    message: "Student created successfully",
    loginCredentials: {
      email,
      password: plainPassword,
    },
    student,
  };
};

//  GET ALL STUDENTS (SEARCH + FILTER + PAGINATION)

export const getStudentsService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  // FILTERS
  if (query.department) filter.department = query.department;
  if (query.year) filter.year = Number(query.year);

  // SEARCH (name, email, studentId)
  if (query.search) {
    filter.$or = [
      { studentId: { $regex: query.search, $options: "i" } },
      { department: { $regex: query.search, $options: "i" } },
    ];
  }

  const cacheKey = JSON.stringify({ page, limit, filter });

  const cached = await getStudentsCache(cacheKey);
  if (cached) return cached;

  const students = await getStudentsRepo(filter, skip, limit);
  const total = await countStudentsRepo(filter);

  const response = {
    data: students,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };

  await setStudentsCache(cacheKey, response);

  return response;
};

//  GET BY ID

export const getStudentByIdService = async (id) => {
  return await findStudentByIdRepo(id);
};

//   UPDATE STUDENT

export const updateStudentService = async (id, data) => {
  await clearStudentsCache();
  return await updateStudentRepo(id, data);
};

//  DELETE STUDENT

export const deleteStudentService = async (id) => {
  await clearStudentsCache();
  return await deleteStudentRepo(id);
};
