import {
  getAllUsersService,
  getUserByIdService,
  updateUserRoleService,
  updateUserStatusService,
} from "./authAdmin.service.js";
import {
  updateRoleValidator,
  updateStatusValidator,
} from "./authAdmin.validator.js";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE ROLE
export const updateUserRole = async (req, res) => {
  try {
    const { role } = updateRoleValidator.parse(req.body);

    const user = await updateUserRoleService(req.params.id, role);

    res.status(200).json({
      success: true,
      message: "Role updated",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE STATUS
export const updateUserStatus = async (req, res) => {
  try {
    const { status } = updateStatusValidator.parse(req.body);

    const user = await updateUserStatusService(req.params.id, status);

    res.status(200).json({
      success: true,
      message: "Status updated",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
