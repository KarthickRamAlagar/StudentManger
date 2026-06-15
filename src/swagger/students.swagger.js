/**
 * @swagger
 * /api/v1/EduManager/students/create:
 *   post:
 *     summary: Create new student
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/StudentCreateRequest'
 *     responses:
 *       201:
 *         description: Student created successfully
 */

/**
 * @swagger
 * /api/v1/EduManager/students/get-all:
 *   get:
 *     summary: Get all students (search, filter, pagination)
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Students fetched successfully
 */

/**
 * @swagger
 * /api/v1/EduManager/students/get-by-id/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/StudentIdParam'
 *     responses:
 *       200:
 *         description: Student fetched successfully
 */

/**
 * @swagger
 * /api/v1/EduManager/students/{id}:
 *   put:
 *     summary: Update student
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/StudentIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/StudentUpdateRequest'
 *     responses:
 *       200:
 *         description: Student updated successfully
 */

/**
 * @swagger
 * /api/v1/EduManager/students/delete/{id}:
 *   delete:
 *     summary: Delete student
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/StudentIdParam'
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
