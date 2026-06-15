export const authAdminSchema = {
  UpdateRoleRequest: {
    type: "object",
    required: ["role"],
    properties: {
      role: {
        type: "string",
        enum: ["teacher", "student"],
        example: "teacher",
      },
    },
  },

  UpdateStatusRequest: {
    type: "object",
    required: ["status"],
    properties: {
      status: {
        type: "string",
        enum: ["active", "inactive", "blocked"],
        example: "active",
      },
    },
  },

  UserListResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
            status: { type: "string" },
          },
        },
      },
    },
  },

  SingleUserResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      data: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          role: { type: "string" },
          status: { type: "string" },
        },
      },
    },
  },
};

export const authAdminParameters = {
  UserIdParam: {
    name: "id",
    in: "path",
    required: true,
    description: "User ID (MongoDB ObjectId)",
    schema: {
      type: "string",
      example: "64f1c2a9b8d3a12c9e9a1234",
    },
  },
};