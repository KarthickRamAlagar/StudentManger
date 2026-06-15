import {
  getAllUsersRepo,
  getUserByIdRepo,
  updateUserRoleRepo,
  updateUserStatusRepo,
} from "./authAdmin.repo.js";

import { setUserCache, getUserCache, deleteUserCache } from "./authAdmin.cache.js";

// GET ALL USERS
export const getAllUsersService = async () => {
  const users = await getAllUsersRepo();
  return users;
};

// GET USER BY ID (with cache)
export const getUserByIdService = async (id) => {
  const cached = await getUserCache(id);
  if (cached) return cached;

  const user = await getUserByIdRepo(id);
  if (!user) throw new Error("User not found");

  await setUserCache(id, user);

  return user;
};

// UPDATE ROLE
export const updateUserRoleService = async (id, role) => {
  const user = await updateUserRoleRepo(id, role);
  if (!user) throw new Error("User not found");

  await deleteUserCache(id);

  return user;
};

// UPDATE STATUS
export const updateUserStatusService = async (id, status) => {
  const user = await updateUserStatusRepo(id, status);
  if (!user) throw new Error("User not found");

  await deleteUserCache(id);

  return user;
};
