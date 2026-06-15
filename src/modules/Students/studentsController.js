import {
  createStudentService,
  getStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
} from "./students.service.js";

import {
  createStudentValidator,
  updateStudentValidator,
} from "./students.validator.js";

/* CREATE */
export const createStudent = async (req, res) => {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      studentId: req.body.studentId,
      department: req.body.department,
      year: Number(req.body.year),
      phone: req.body.phone,
      address: req.body.address || "",
    };

    const data = createStudentValidator.parse(body);

    const result = await createStudentService(data, req.file, req.user.id);

    res.status(201).json({
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

/* GET ALL */
export const getStudents = async (req, res) => {
  try {
    const result = await getStudentsService(req.query);

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

/* GET BY ID */
export const getStudentById = async (req, res) => {
  try {
    const result = await getStudentByIdService(req.params.id);
    console.log("DB RESULT:", result);
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

/* UPDATE */
export const updateStudent = async (req, res) => {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      studentId: req.body.studentId,
      department: req.body.department,
      year: req.body.year ? Number(req.body.year) : undefined,
      phone: req.body.phone,
      address:
        req.body.address && req.body.address.trim() !== ""
          ? req.body.address
          : undefined,
    };

    const data = updateStudentValidator.parse(body);

    const result = await updateStudentService(
      req.params.id,
      data,
      req.file, // if you support image update
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* DELETE */
export const deleteStudent = async (req, res) => {
  try {
    const result = await deleteStudentService(req.params.id);

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
