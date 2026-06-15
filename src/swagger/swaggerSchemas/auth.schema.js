export const authSchema = {
  SignUpRequest: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string", example: "Karthick" },
      email: { type: "string", example: "karthick@gmail.com" },
      password: { type: "string", example: "Password@123" },
      role: {
        type: "string",
        enum: ["teacher", "student"],
        example: "teacher",
      },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", example: "karthick@gmail.com" },
      password: { type: "string", example: "Password@123" },
    },
  },

  ForgotPasswordRequest: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", example: "karthick@gmail.com" },
    },
  },

  ResetPasswordRequest: {
    type: "object",
    required: ["email", "otp", "newPassword"],
    properties: {
      email: { type: "string", example: "karthick@gmail.com" },
      otp: { type: "string", example: "123456" },
      newPassword: { type: "string", example: "NewPassword@123" },
    },
  },

  RefreshTokenRequest: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: { type: "string", example: "jwt.refresh.token.here" },
    },
  },

  UserProfile: {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
      role: { type: "string" },
      status: { type: "string" },
    },
  },

  LoginResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      message: { type: "string", example: "Login successful" },
      data: {
        type: "object",
        properties: {
          accessToken: { type: "string" },
          refreshToken: { type: "string" },
          user: { $ref: "#/components/schemas/UserProfile" },
        },
      },
    },
  },

  ErrorResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: false },
      message: { type: "string", example: "Something went wrong" },
    },
  },
};

export const authParameters = {
  ResetTokenParam: {
    name: "token",
    in: "path",
    required: true,
    description: "Password reset token sent via email",
    schema: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
  },

  OptionalUserIdParam: {
    name: "userId",
    in: "query",
    required: false,
    description: "Optional user id filter (for future extension)",
    schema: {
      type: "string",
      example: "66a2fe8edcd236d138c88b6a0",
    },
  },
};
