import User from "../../db/user.collection.js";

// GET ALL USERS
export const getAllUsersRepo = async () => {
  return await User.find().select("-password").sort({ createdAt: -1 });
};

// GET USER BY ID
export const getUserByIdRepo = async (id) => {
  return await User.findById(id).select("-password");
};

// UPDATE ROLE
export const updateUserRoleRepo = async (id, role) => {
  return await User.findByIdAndUpdate(id, { role }, { new: true }).select(
    "-password",
  );
};

// UPDATE STATUS (block/unblock)
export const updateUserStatusRepo = async (id, status) => {
  return await User.findByIdAndUpdate(id, { status }, { new: true }).select(
    "-password",
  );
};
