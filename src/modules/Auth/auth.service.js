import {
  createUserRepo,
  findUserByEmailRepo,
  findUserByIdRepo,
  incrementTokenVersionRepo,
  updateLastLoginRepo,
  updatePasswordRepo,
} from "./auth.repo.js";

import {
  hashPassword,
  comparePassword,
} from "../../utils/Auth/password.utils.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/Auth/jwt.utils.js";

import jwt from "jsonwebtoken";

import {
  setSessionCache,
  getSessionCache,
  deleteSessionCache,
} from "./auth.cache.js";

import dotenv from "dotenv";

dotenv.config();

// SIGNUP SERVICE
export const signUpService = async (data) => {
  const { name, email, password, role } = data;

  // check user exists
  const existingUser = await findUserByEmailRepo(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const passwordHash = await hashPassword(password);

  // create user
  const user = await createUserRepo({
    name,
    email,
    password: passwordHash,
    role: role || "student",
  });

  return {
    message: "User created successfully",
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

// LOGIN SERVICE

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmailRepo(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // store session in redis
  await setSessionCache(user._id.toString(), refreshToken);

  // update last login
  await updateLastLoginRepo(user._id);

  return {
    accessToken,
    refreshToken,
    user: payload,
  };
};

// LOGOUT SERVICE

export const logoutService = async (userId) => {
  await deleteSessionCache(userId);
  await incrementTokenVersionRepo(userId);

  return {
    message: "Logged out successfully",
  };
};

// GET PROFILE SERVICE

export const getProfileService = async (userId) => {
  const user = await findUserByIdRepo(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// FORGOT PASSWORD

export const forgotPasswordService = async (email) => {
  const user = await findUserByEmailRepo(email);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    message: "User exists. Reset password flow can be implemented next step.",
  };
};

// RESET PASSWORD

export const resetPasswordService = async ({ email, newPassword }) => {
  const user = await findUserByEmailRepo(email);

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await hashPassword(newPassword);

  await updatePasswordRepo(email, hashedPassword);

  // invalidate sessions after password reset
  await deleteSessionCache(user._id.toString());
  await incrementTokenVersionRepo(user._id);

  return {
    message: "Password reset successfully",
  };
};

// REFRESH TOKEN SERVICE

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token missing");
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }

  const userId = decoded.id;

  const storedToken = await getSessionCache(userId);

  if (storedToken !== refreshToken) {
    throw new Error("Session expired or invalid");
  }

  const payload = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };

  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // rotate session
  await setSessionCache(userId, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
