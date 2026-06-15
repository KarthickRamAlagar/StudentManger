export const studentSchema = {
  StudentCreateRequest: {
    type: "object",
    required: [
      "name",
      "email",
      "studentId",
      "department",
      "year",
      "phone",
      "address",
    ],
    properties: {
      name: { type: "string", example: "Karthick" },
      email: { type: "string", example: "karthick@gmail.com" },
      studentId: { type: "string", example: "STU001" },
      department: { type: "string", example: "CSE" },
      year: { type: "number", example: 3 },
      phone: { type: "string", example: "9876543210" },
      address: { type: "string", example: "Chennai" },
    },
  },

  StudentUpdateRequest: {
    type: "object",
    properties: {
      name: { type: "string", example: "Karthick Updated" },
      department: { type: "string", example: "CSE-DS" },
      year: { type: "number", example: 4 },
      phone: { type: "string", example: "9999999999" },
      address: { type: "string", example: "Bangalore" },
    },
  },

  StudentResponse: {
    type: "object",
    properties: {
      _id: { type: "string" },
      userId: { type: "string" },
      studentId: { type: "string" },
      department: { type: "string" },
      year: { type: "number" },
      phone: { type: "string" },
      address: { type: "string" },
      profileImage: {
        type: "object",
        properties: {
          public_id: { type: "string" },
          secure_url: { type: "string" },
        },
      },
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
  },

  StudentListResponse: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: { $ref: "#/components/schemas/StudentResponse" },
      },
      pagination: {
        type: "object",
        properties: {
          total: { type: "number" },
          page: { type: "number" },
          pages: { type: "number" },
        },
      },
    },
  },
};

export const studentParameters = {
  StudentIdParam: {
    name: "id",
    in: "path",
    required: true,
    description: "Student ID (MongoDB ObjectId)",
    schema: {
      type: "string",
      example: "66a2fe8edcd236d138c88b6a0",
    },
  },
};