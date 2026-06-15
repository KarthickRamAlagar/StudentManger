import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },

    profileImage: {
      public_id: {
        type: String,
        default: null,
      },

      secure_url: {
        type: String,
        default: null,
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes


userSchema.index({ role: 1 });

userSchema.index({ status: 1 });

// Model

const User = mongoose.model("User", userSchema, "users");

export default User;
