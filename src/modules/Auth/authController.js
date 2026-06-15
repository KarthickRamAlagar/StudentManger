import {
  signUpService,
  loginService,
  logoutService,
  getProfileService,
  forgotPasswordService,
  resetPasswordService,
  refreshTokenService,
} from "./auth.service.js";

import {
  signUpValidator,
  loginValidator,
  forgotPasswordValidator,
  refreshTokenValidator,
} from "./auth.validator.js";

// SIGNUP CONTROLLER
export const signUp = async (req, res) => {
  try {
    const data = signUpValidator.parse(req.body);

    const result = await signUpService(data);

    res.status(201).json({
      success: true,
      message: result.message,
      data: result.user,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.issues,
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const data = loginValidator.parse(req.body);

    const result = await loginService(data);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.issues,
      });
    }

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// LOGOUT CONTROLLER
export const logout = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await logoutService(userId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PROFILE CONTROLLER
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await getProfileService(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = forgotPasswordValidator.parse(req.body);

    const result = await forgotPasswordService(email);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const result = await resetPasswordService({
      email,
      newPassword,
    });

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = refreshTokenValidator.parse(req.body);

    const result = await refreshTokenService(refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
