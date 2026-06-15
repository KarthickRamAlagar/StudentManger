import mongoose from "mongoose";

// Schema
const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

//  Indexes

studentSchema.index({ department: 1 });

studentSchema.index({ year: 1 });

studentSchema.index({
  department: 1,
  year: 1,
});

//Model
const Student = mongoose.model("Student", studentSchema);

export default Student;
