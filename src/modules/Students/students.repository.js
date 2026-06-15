import Student from "../../db/student.collection.js";

// CREATE
export const createStudentRepo = async (data) => {
  return await Student.create(data);
};

// FIND BY ID
export const findStudentByIdRepo = async (id) => {
  return await Student.findById(id).populate("userId", "-password");
};

// UPDATE
export const updateStudentRepo = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// DELETE
export const deleteStudentRepo = async (id) => {
  return await Student.findByIdAndDelete(id);
};

// COUNT
export const countStudentsRepo = async (filter) => {
  return await Student.countDocuments(filter);
};

// GET LIST WITH FILTER + SEARCH + PAGINATION
export const getStudentsRepo = async (filter, skip, limit) => {
  return await Student.find(filter)
    .populate("userId", "-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
};
